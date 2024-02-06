import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const insertEntry = mutation({
  args: { task: v.string(), filepath: v.string() },
  handler: async (ctx, args) => {
    const newTaskId = await ctx.db.insert("tasks", {
      text: args.task,
      filepath: args.filepath,
      isCompleted: false,
    });
    return newTaskId;
  },
});
