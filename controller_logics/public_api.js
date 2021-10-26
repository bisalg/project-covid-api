const Vaccination_Model = require('../models/vaccinationModel')
const { StatusCodes } = require('http-status-codes')

const publicAPI = async (req, res) => {
    let { location, startDate, endDate } = req.query
    let queryObject = {}
    let dailyObject = {}
    let weeklyObject = {}
    let monthlyObject = {}
    let yearlyObject = {}

    if (location) {
        queryObject.location = location
        dailyObject.location = location
        weeklyObject.location = location
        monthlyObject.location = location
        yearlyObject.location = location
    }

    if (startDate) {
        queryObject.vaccinationDate = { $gte: new Date(startDate) }
    }
    if (endDate) {
        queryObject.vaccinationDate = { ...queryObject.vaccinationDate, $lte: new Date(endDate) }
    }

    //sorting it in order so that recent one comes before
    let API = await Vaccination_Model.find(queryObject).sort('-vaccinationDate')

    const dateRange = (number) => {
        let d = new Date()
        let start = new Date(d.getFullYear(), d.getMonth(), d.getDate() - number)
        let end = new Date(d.getFullYear(), d.getMonth(), d.getDate())

        return { start, end }
    }


    // Daily Vaccination i.e average of vaccination done in last 7 days
    let range_1 = dateRange(7)
    dailyObject.vaccinationDate = { $lte: range_1.end, $gt: range_1.start }

    let dailyData = await Vaccination_Model.find(dailyObject)

    let daily_Vaccination = Number((dailyData.length / 7).toFixed(2))


    //weekly Vaccination i.e average of vaccination done in last 4 weeks i.e 28days
    let range_2 = dateRange(28)

    weeklyObject.vaccinationDate = { $lte: range_2.end, $gt: range_2.start }

    let weeklyData = await Vaccination_Model.find(weeklyObject)

    let weekly_Vaccination = Number((weeklyData.length / 4).toFixed(2))


    //monthly Vaccination i.e average of vaccination done in last 3 months i.e 90days
    let range_3 = dateRange(90)

    monthlyObject.vaccinationDate = { $lte: range_3.end, $gt: range_3.start }

    let monthlyData = await Vaccination_Model.find(weeklyObject)

    let monthly_Vaccination = Number((monthlyData.length / 3).toFixed(2))


    //yearly vaccination
    yearlyObject.vaccinationDate = { $gte: new Date(new Date().getFullYear()) }
    let yearlyData = await Vaccination_Model.find(yearlyObject)
    let yearly_Vaccination = yearlyData.length

    API = API.map((item) => {

        let {
            aadhaarNo,
            firstDose,
            secondDose,
            vaccinationStatus,
            location,
            vaccinationDate,
            uploader_IpAddress
        } = item

        let modifiedDate = vaccinationDate.toDateString()

        return {
            aadhaarNo,
            firstDose,
            secondDose,
            vaccinationStatus,
            location,
            vaccinationDate: modifiedDate,
            uploader_IpAddress

        };

    })
    res.status(StatusCodes.OK).json({
        PROGRESS_REPORT: {
            total_Vaccination: API.length,
            daily_Vaccination,
            weekly_Vaccination,
            monthly_Vaccination,
            yearly_Vaccination
        },
        PUBLIC_API: API
    })
}

module.exports = publicAPI;