import express from 'express'
import { getBarCharts, getLineCharts, getPie, getstats } from '../controllers/stats.controller.js';


export  const dashroute =express.Router();


dashroute.get("/stats",getstats)


dashroute.get("/pie",getPie)


dashroute.get("/bar",getBarCharts)


dashroute.get("/line",getLineCharts)


