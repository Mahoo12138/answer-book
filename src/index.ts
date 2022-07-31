import { Context, Time, segment, Schema } from 'koishi'

import * as Answer from './answer.json'  

export const name = 'answerbook'


interface Answer {
  [id: number] : {
    answer: string
  }
}

interface Config {
  duration: number
}

export const Config = Schema.object({
  duration: Schema.number().default(10).min(1).max(20).description('答案的等待时长'),
})

const answer = Answer as Answer

export function apply(ctx: Context, cfg: Config) {
  ctx.command('answer', '翻阅答案之书')
    .example('answer')
    .example('翻阅答案')
    .shortcut('翻阅答案')
    .action(async ({ options, session }) => {
      await session.sendQueued('在心中默念你的问题，之后答案之书会给你答案', cfg.duration * Time.second)
      const id = Math.floor(Math.random() * 286)
      await session.sendQueued(segment('at', { id: session.userId }) + `${answer[id].answer}`)
    })
}
