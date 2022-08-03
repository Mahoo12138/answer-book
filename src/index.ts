import { Context, Time, segment, Schema } from 'koishi'

import * as Answer from './answer.json'

import { randomIdFormQuestion } from './utils'

export const name = 'answerbook'


interface Answer {
  answer: string
}

interface Config {
  duration: number
}

export const Config = Schema.object({
  duration: Schema.number().default(10).min(1).max(20).description('答案的等待时长'),
})

const answerList = Answer as Answer[]

export function apply(ctx: Context, cfg: Config) {
  ctx.command('answer', '在答案之书中寻找答案')
    .example('answer -q 今天我要摸鱼吗？')
    .example('翻阅答案/答案之书')
    .option('ask', '-a 采用问答模式')
    .option('question', '-q <question:string> 设定你想询问的问题')
    .shortcut('翻阅答案', { options: {} })
    .shortcut('答案之书', { options: { ask: true } })
    .action(async ({ options, session }) => {
      console.log(options)
      let { question } = options;
      if (options.ask && !options.question) {
        session.send("有什么困扰你的难题呢？")
        question = await session.prompt(30 * 1000)
      } else if(!options.question){
        await session.sendQueued('在心中默念你的问题，之后答案之书会给你答案', cfg.duration * Time.second)
        question = session.username + new Date().toISOString();
      }
      const id = randomIdFormQuestion(question, answerList?.length)
      await session.sendQueued(segment('at', { id: session.userId }) + `${answerList[id].answer}`)
    })
}