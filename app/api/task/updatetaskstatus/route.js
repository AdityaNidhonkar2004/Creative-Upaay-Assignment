import { ObjectId } from "mongodb";
import Connection from "@/database/config"; // Database connection setup
import Task from "@/models/task"; // Task model using Mongoose

// Initialize database connection
Connection();

export async function PUT(request) {
  try {
    // Parse the incoming request body
    const { taskId, newStatus } = await request.json();

    // Ensure the taskId is a valid ObjectId if you're using Mongoose
    const objectId = new ObjectId(taskId);

    // Use Mongoose to find and update the task
    const updatedTask = await Task.findByIdAndUpdate(
      objectId, // Task ID as ObjectId
      { status: newStatus }, // Update status field
      { new: true } // Return the updated document
    );

    if (!updatedTask) {
      return new Response(
        JSON.stringify({ message: "Task not found" }),
        { status: 404 }
      );
    }

    // Return the updated task in the response
    return new Response(JSON.stringify(updatedTask), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error updating task status:", error);
    return new Response(
      JSON.stringify({ message: "Failed to update task status" }),
      { status: 500 }
    );
  }
}
