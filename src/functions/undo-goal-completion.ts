import { eq } from 'drizzle-orm'
import { db } from '../db'
import { goalCompletions } from '../db/schema'

interface UndoGoalCompletionRequest {
  completionId: string
}

export async function undoGoalCompletion({
  completionId,
}: UndoGoalCompletionRequest) {
  const result = await db
    .delete(goalCompletions)
    .where(eq(goalCompletions.id, completionId))
    .returning()

  return {
    result,
  }
}
