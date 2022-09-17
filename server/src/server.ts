import express from "express"
import cors from 'cors'
import { PrismaClient } from '@prisma/client'
import { convertHourStringToMinutes } from "./utils/convert-hour-string-to-minutes"
import { convertMinutesToHourString } from "./utils/convert-minutes-to-hour-string"

const app = express()

app.use(express.json())// para express entender o formato json
app.use(cors({
  // origin: 'https://rocketseat.com.br',
}))

const prisma = new PrismaClient({
  log: ['query']
})// cria a conexão com o banco de dados

// OBS: lembre-se que ao utilizar o banco de dados utilizar o async/await pois pode ter um deley de busca das informações no database

app.get("/games", async (request, response) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  })

  return response.status(200).json(games)
})

app.post("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id;

  const body: any = request.body;

  const ad = await prisma.ad.create({
    data: {
      gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel,
    }
  })

  return response.status(201).json(ad);
})

app.get("/games/:id/ads", async (request, response) => {
  const gameId = request.params.id

  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true,
    },
    where: {
      gameId,
    },
    orderBy: {
      createdAt: 'desc'
    }
  })
  
  return response.status(200).json(ads.map((ad: any) => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(','),// tacando weekDays no formato de array
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd),
    }
  }))
})

app.get("/ads/:id/discord", async (request, response) => {
  const adsId = request.params.id

  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true,
    },
    where: {
      id: adsId,
    }
  })
   
  return response.status(200).json({
    discord: ad.discord,
  })
})



app.listen(3333, () => console.log("Server is running!"))
