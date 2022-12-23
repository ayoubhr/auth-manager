import { Request, Response, NextFunction } from "express"
import axios from 'axios'
import ExceptionHandler from "../exceptions/exceptions-handler";

const urbanDictionaryRequest = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const options = {
      method: 'GET',
      url: process.env.RAPIDAPI_URL,
      params: { term: req.body.term },
      headers: {
        'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
        'X-RapidAPI-Host': process.env.RAPIDAPI_HOST
      }
    }
    const response = await axios.request(options)
    return res.status(200).send(response.data)
  } catch (error) {
    console.error(error)
    console.log("Axios request has failed.")
    next(error)
    throw new ExceptionHandler(400, 'Axios request has failed.')
  }
}

const controller = {
  urbanDictionaryRequest: urbanDictionaryRequest
}

export default controller