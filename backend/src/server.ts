import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req,res) => {
    res.send("WorkOrderIQ Backend is running!");
});

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "WorkOrderIQ API is healthy",
  });
});

function detectCategory(workOrderText: string): string {
  const text = workOrderText.toLowerCase();

  if (
    text.includes("printer") ||
    text.includes("printing") ||
    text.includes("print")
  ) {
    return "Printer";
  }

  if (
    text.includes("projector") ||
    text.includes("display") ||
    text.includes("screen") ||
    text.includes("hdmi")
  ) {
    return "Classroom Technology";
  }

  if (
    text.includes("network") ||
    text.includes("wifi") ||
    text.includes("wi-fi") ||
    text.includes("ethernet") ||
    text.includes("internet")
  ) {
    return "Network";
  }

  if (
    text.includes("login") ||
    text.includes("password") ||
    text.includes("account") ||
    text.includes("access")
  ) {
    return "Account Access";
  }

  if (
    text.includes("computer") ||
    text.includes("desktop") ||
    text.includes("laptop") ||
    text.includes("monitor")
  ) {
    return "Computer Hardware";
  }

  return "General IT Support";
}

function detectPriority(workOrderText: string): string {
  const text = workOrderText.toLowerCase();

  if (
    text.includes("urgent") ||
    text.includes("asap") ||
    text.includes("immediately") ||
    text.includes("class starts") ||
    text.includes("before noon") ||
    text.includes("multiple staff") ||
    text.includes("multiple users") ||
    text.includes("department-wide") ||
    text.includes("cannot work") ||
    text.includes("down")
  ) {
    return "High";
  }

  if (
    text.includes("soon") ||
    text.includes("today") ||
    text.includes("this afternoon") ||
    text.includes("this morning") ||
    text.includes("intermittent") ||
    text.includes("keeps disconnecting")
  ) {
    return "Medium";
  }

  return "Low";
}

function getChecklist(category: string): string[] {
  if (category === "Printer") {
    return [
      "Confirm the printer is powered on.",
      "Check the printer display for error messages.",
      "Verify network or USB connection.",
      "Check the print queue for stuck jobs.",
      "Restart the printer if needed.",
      "Print a test page.",
      "Escalate if the printer remains unreachable or shows a hardware fault.",
    ];
  }

  if (category === "Classroom Technology") {
    return [
      "Confirm the display or projector is powered on.",
      "Check HDMI, DisplayPort, or adapter connections.",
      "Verify the correct input source is selected.",
      "Restart the instructor computer if needed.",
      "Test with another cable or device if available.",
      "Document whether the issue affects one room or multiple rooms.",
      "Escalate if hardware replacement or AV support is needed.",
    ];
  }

  if (category === "Network") {
    return [
      "Confirm whether the issue affects one device or multiple users.",
      "Check Ethernet, Wi-Fi, or network adapter status.",
      "Restart the affected device if appropriate.",
      "Test connection to another website or internal system.",
      "Check whether nearby devices have the same issue.",
      "Document building, room, and affected device details.",
      "Escalate if the issue appears to affect the network infrastructure.",
    ];
  }

  if (category === "Account Access") {
    return [
      "Confirm the user account or system affected.",
      "Ask whether the user recently changed their password.",
      "Verify the user is using the correct username or login method.",
      "Check for account lockout or access permission issues.",
      "Have the user try signing in from another browser or device if appropriate.",
      "Document any error messages exactly.",
      "Escalate if account permissions or identity management support is required.",
    ];
  }

  if (category === "Computer Hardware") {
    return [
      "Confirm the affected device and location.",
      "Check power, display, keyboard, mouse, and cable connections.",
      "Restart the computer if appropriate.",
      "Check for visible hardware damage or error messages.",
      "Test with known-working peripherals if available.",
      "Document the device name, asset tag, and symptoms.",
      "Escalate if repair, replacement, or imaging is needed.",
    ];
  }

  return [
    "Confirm the issue with the user.",
    "Check the affected device or system.",
    "Verify network, power, or account access if relevant.",
    "Document troubleshooting steps.",
    "Escalate if the issue cannot be resolved at first level.",
  ];
}

function generateSummary(category: string, priority: string): string {
  return `This appears to be a ${priority.toLowerCase()} priority ${category.toLowerCase()} issue that may require first-level troubleshooting and documentation.`;
}

function generateTechnicianNote(category: string, priority: string): string {
  return `Reviewed the reported ${category.toLowerCase()} issue and identified it as ${priority.toLowerCase()} priority. Begin with the recommended checklist, document troubleshooting steps, and escalate if the issue cannot be resolved at first level.`;
}


app.post("/api/analyze", (req,res) => {
    const { workOrderText } = req.body;

    if(!workOrderText || typeof workOrderText !== "string") {
        return res.status(400).json({ 
            error: "workOrderText is required and must be a string"
        });
    }

    const category = detectCategory(workOrderText);
    const priority = detectPriority(workOrderText);
    const checklist = getChecklist(category);
    const summary = generateSummary(category, priority);
    const technicianNote = generateTechnicianNote(category, priority);
    

    res.json({
        summary: summary,
        category: category,
        priority: priority,
        checklist: checklist,
        technicianNote: "Reviewed the reported issue and began standard troubleshooting. Further action may be required depending on device or system status."
    });
});

app.listen(3000, () => {
    console.log("Backend server is running on http://localhost:3000");
});