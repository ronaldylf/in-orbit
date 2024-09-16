import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { undoGoalCompletion } from '../../functions/undo-goal-completion'
import z from 'zod'

export const undoGoalCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/completions/:completionId',
    {
      schema: {
        params: z.object({
          completionId: z.string().cuid2('isso não é um id válido'),
        }),
      },
    },
    async request => {
      const { completionId } = request.params
      const { result } = await undoGoalCompletion({ completionId })

      return { result }
    }
  )
}
