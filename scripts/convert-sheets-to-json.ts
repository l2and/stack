import { google } from 'googleapis';
import fs from 'fs';
import path from 'path';
import { GOOGLE_SHEETS_ID } from "@/lib/constants";

// Helper function to process markdown list items
const processMarkdownList = (markdown: string): string[] => {
  if (!markdown) return [];
  return markdown
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.startsWith('*'))
    .map(line => line.replace(/^\*\s*/, '').trim());
};

// Helper function to process comma-separated items
const processCommaSeparated = (text: string): string[] => {
  if (!text) return [];
  return text
    .split(',')
    .map(item => item.trim())
    .filter(Boolean);
};

async function getSheetHeaders(sheets: any, sheetName: string) {
  const headerResponse = await sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEETS_ID,
    range: `${sheetName}!A1:Z1`,
  });
  
  return headerResponse.data.values?.[0] || [];
}

async function getSheetData(sheets: any, sheetName: string) {
  const response = await sheets.spreadsheets.values.get({
    spreadsheetId: GOOGLE_SHEETS_ID,
    range: `${sheetName}!A2:Z`, // Assuming header in row 1
  });
  
  return response.data.values || [];
}

async function processTools(sheets: any) {
  console.log('Processing tools...');
  
  const headers = await getSheetHeaders(sheets, 'tools');
  const rows = await getSheetData(sheets, 'tools');
  
  // Process the rows
  const tools = rows.map(row => {
    const tool: Record<string, any> = {};
    
    // Standard fields first
    headers.forEach((header, index) => {
      if (!header.includes('|') && !['useCases', 'tips'].includes(header)) {
        if (['howToUse', 'caveats'].includes(header) && row[index]) {
          // Process as markdown list
          tool[header] = processMarkdownList(row[index]);
        } else {
          tool[header] = row[index] || '';
        }
      }
    });
    
    // Process useCases columns with numbered format
    const useCases: { title: string; items: string[] }[] = [];
    
    // Support up to 5 use cases (0-4)
    for (let i = 0; i < 5; i++) {
      const nameHeader = `useCases${i}|name`;
      const itemsHeader = `useCases${i}|items`;
      
      const nameIndex = headers.findIndex(h => h === nameHeader);
      const itemsIndex = headers.findIndex(h => h === itemsHeader);
      
      if (nameIndex !== -1 && itemsIndex !== -1 && row[nameIndex] && row[itemsIndex]) {
        const title = row[nameIndex].trim();
        const items = processMarkdownList(row[itemsIndex]);
        
        if (title && items.length > 0) {
          useCases.push({ title, items });
        }
      }
    }
    tool.useCases = useCases;
    
    // Process tips columns with numbered format
    const tips: { title: string; items: string[] }[] = [];
    
    for (let i = 0; i < 5; i++) {
      const nameHeader = `tips${i}|name`;
      const itemsHeader = `tips${i}|items`;
      
      const nameIndex = headers.findIndex(h => h === nameHeader);
      const itemsIndex = headers.findIndex(h => h === itemsHeader);
      
      if (nameIndex !== -1 && itemsIndex !== -1 && row[nameIndex] && row[itemsIndex]) {
        const title = row[nameIndex].trim();
        const items = processMarkdownList(row[itemsIndex]);
        
        if (title && items.length > 0) {
          tips.push({ title, items });
        }
      }
    }
    tool.tips = tips;
    
    return tool;
  });
  
  // Write to JSON file
  const outputFile = path.join(process.cwd(), 'src/data/tools.json');
  const output = {
    tools: tools.sort((a, b) => {
      if (!a.addedOn || !b.addedOn) return 0;
      return new Date(b.addedOn).getTime() - new Date(a.addedOn).getTime();
    })
  };
  
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
  console.log(`Synced ${tools.length} tools to JSON format`);
}

async function processProcesses(sheets: any) {
  console.log('Processing processes...');
  
  const headers = await getSheetHeaders(sheets, 'processes');
  const rows = await getSheetData(sheets, 'processes');
  
  // Process the rows
  const processes = rows.map(row => {
    const process: Record<string, any> = {};
    
    // Standard fields first
    headers.forEach((header, index) => {
      if (!header.includes('|') && !['toolsInvolved', 'steps', 'tips'].includes(header)) {
        // Handle processImage specially to convert string to boolean
        if (header === 'processImage') {
          // Convert string "TRUE"/"FALSE" to boolean true/false
          process[header] = row[index] ? 
            row[index].toUpperCase() === 'TRUE' : false;
        } else {
          process[header] = row[index] || '';
        }
      }
    });
    
    // Process toolsInvolved as comma-separated list
    const toolsInvolvedIndex = headers.findIndex(h => h === 'toolsInvolved');
    if (toolsInvolvedIndex !== -1 && row[toolsInvolvedIndex]) {
      process.toolsInvolved = processCommaSeparated(row[toolsInvolvedIndex]);
    } else {
      process.toolsInvolved = [];
    }
    
    // Process steps as markdown list
    const stepsIndex = headers.findIndex(h => h === 'steps');
    if (stepsIndex !== -1 && row[stepsIndex]) {
      process.steps = processMarkdownList(row[stepsIndex]);
    } else {
      process.steps = [];
    }
    
    // Process tips columns - for processes, tips is an object with key-value pairs
    const tips: Record<string, string[]> = {};
    
    for (let i = 0; i < 5; i++) {
      const nameHeader = `tips${i}|name`;
      const itemsHeader = `tips${i}|items`;
      
      const nameIndex = headers.findIndex(h => h === nameHeader);
      const itemsIndex = headers.findIndex(h => h === itemsHeader);
      
      if (nameIndex !== -1 && itemsIndex !== -1 && row[nameIndex] && row[itemsIndex]) {
        const title = row[nameIndex].trim();
        const items = processMarkdownList(row[itemsIndex]);
        
        if (title && items.length > 0) {
          tips[title] = items;
        }
      }
    }
    process.tips = tips;
    
    return process;
  });
  
  // Write to JSON file
  const outputFile = path.join(process.cwd(), 'src/data/processes.json');
  const output = {
    processes: processes.sort((a, b) => {
      if (!a.addedOn || !b.addedOn) return 0;
      return new Date(b.addedOn).getTime() - new Date(a.addedOn).getTime();
    })
  };
  
  fs.writeFileSync(outputFile, JSON.stringify(output, null, 2));
  console.log(`Synced ${processes.length} processes to JSON format`);
}

async function syncGoogleSheetToJson() {
  try {
    // Set up authentication with GoogleAuth
    const auth = new google.auth.GoogleAuth({
      keyFile: path.join(process.cwd(), 'google-credentials.json'),
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
    
    // Create sheets API client
    const sheets = google.sheets({ 
      version: 'v4', 
      auth: auth
    });
    
    // Process both tools and processes
    await processTools(sheets);
    await processProcesses(sheets);
    
    console.log('Google Sheets sync completed successfully');
  } catch (error) {
    console.error('Error syncing Google Sheet:', error);
  }
}

syncGoogleSheetToJson();