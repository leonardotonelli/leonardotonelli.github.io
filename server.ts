import express from "express";
import { createServer as createViteServer } from "vite";
import { Client } from "@notionhq/client";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // API Routes
  app.get("/api/papers", async (req, res) => {
    try {
      const token = process.env.NOTION_TOKEN;
      const databaseId = process.env.NOTION_DATABASE_ID;

      if (!token || !databaseId) {
        return res.status(400).json({ error: "Missing Notion configuration (NOTION_TOKEN or NOTION_DATABASE_ID)" });
      }

      // Initialize Notion client inside the handler to ensure fresh env vars
      const notion = new Client({ auth: token });

      // Helper to extract database ID from a Notion URL if provided
      const extractDatabaseId = (idOrUrl: string) => {
        if (!idOrUrl) return "";

        // Try to extract from URL first
        const urlMatch = idOrUrl.match(/([a-f0-9]{32})/);
        if (urlMatch) return urlMatch[1];

        // Try to match hyphenated ID
        const hyphenatedMatch = idOrUrl.match(/([a-f0-9]{8}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{4}-[a-f0-9]{12})/);
        if (hyphenatedMatch) return hyphenatedMatch[1].replace(/-/g, "");

        // Otherwise just clean hyphens and spaces
        return idOrUrl.replace(/-/g, "").trim();
      };

      const cleanDatabaseId = extractDatabaseId(databaseId);

      if (!cleanDatabaseId || cleanDatabaseId.length !== 32) {
        console.error("Invalid Notion Database ID extracted:", cleanDatabaseId);
        return res.status(400).json({ error: "Invalid Notion Database ID. Please provide a valid 32-character ID or a Notion URL." });
      }

      console.log("Querying Notion Database ID:", cleanDatabaseId);

      let response: any;

      // Try using the standard query method first
      try {
        const notionAny = notion as any;
        if (notionAny.databases && typeof notionAny.databases.query === 'function') {
          response = await notionAny.databases.query({
            database_id: cleanDatabaseId,
            sorts: [
              {
                timestamp: "created_time",
                direction: "descending",
              },
            ],
          });
        } else {
          throw new Error("notion.databases.query is not a function");
        }
      } catch (error: any) {
        console.warn("Standard query failed, trying fallback request method:", error.message);
        // Fallback to manual request if the standard method fails
        response = await notion.request({
          path: `databases/${cleanDatabaseId}/query`,
          method: "post",
          body: {
            sorts: [
              {
                timestamp: "created_time",
                direction: "descending",
              },
            ],
          },
        });
      }

      // Map Notion response to a simpler format
      const papers = response.results.map((page: any) => {
        const props = page.properties;

        // Helper to get plain text from rich text array
        const getPlainText = (property: any) => {
          return property?.rich_text?.map((t: any) => t.plain_text).join("") || "";
        };

        return {
          id: page.id,
          title: props.Name?.title[0]?.plain_text || "Untitled",
          author: getPlainText(props.Authors) || "Unknown",
          date: props.Date?.date?.start || page.created_time,
          tags: props.Tags?.multi_select?.map((t: any) => t.name) || [],
          summary: getPlainText(props.Summary),
          url: page.url,
        };
      });

      res.json(papers);
    } catch (error: any) {
      console.error("Notion API Error:", error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
