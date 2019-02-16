const express = require('express')
const request = require('request')
const app = express()
const port = 5006

// queryString = day, avg per hour
/* response 
    {
        result_avg: [
            {
                "rain": 0,
                "temperature": 27.98542,
                "humidity": 80,
                "pm_1_0": 16,
                "pm_10": 25,
                "pm_2_5": 23,
                "start_ts": 1550250960000,
                "end_ts": 1550450960000

            },
            {
                "rain": 0,
                "temperature": 27.98542,
                "humidity": 80,
                "pm_1_0": 16,
                "pm_10": 25,
                "pm_2_5": 23,
                "start_ts": 1550250960000,
                "end_ts": 1550450960000
            }
        ]
    }
*/
const weatherCredential = {
    "cred": [
        {
            "id": 1,
            "collectionId": "sc-be1bcdfa-cf15-48f5-a018-17eaf55fa1e4",
            "ticket": "eyJkYXRhIjoiTWx1cHZOS2k3eFVxVGgtWmp2X3NxM2hkQk9CR21iMnBaWVRSc3MzWHFBaEdxdk80dTFTcTh2U1lyUUpqZXdPMmdNVUJXZXRXcm1RYWtJNERwVU9hbEtWZEVuekQxTWVQakJjY1FWNE11NmczQW51M0ZMQXZCZXZtazlFM2pXLTdPMzkxYllDT2dBTUczeUpWX2RiMEtjMmNrNm94NmJ6R3Y1cW5iUjBMbWlLNWMtS1FuQ2kxN1FFcGVBT0RfbWdHaWRRMW1uOUlLWVFvekhhR012TTItQVFEa19XanduaUJvTFVNR2JlM19IeVFvTlhZQnFXMEFwdXRzQjlUOG9YTWdzdlZYTW5QWHFudUhpYnJIREt2Q255YXRCM19yOU84US1zWk4tdVQzSUlsWDhhTW93SXMtSnRXd0NkZE5GVmUiLCJrZXkiOiJkRkNaMTFsS29UbzBhUkpqSHJyQ3JZWWd3NTZNNGFWdHJFVHNrYjd6UmFncG5OOUJHUzB2THp4RzZrajRFUm4wbDNVdFpySUxPZGhVMjhpTXNZZDlHbU5XRVlzODhLMWxzcE9jbk1PMUplT3ZFRWpVbjdQSVpuQ2JvUEt6UHd2UkJGdmF4ZEhzc2ZLMWdSTWJCcU52Z25BVXVSeFpEUV9IQTJla1dIRkYzdzd1Y1dPVlFoTk9mNDRGV1RSYnBtUDBrQkNwcVpXT0QySHoweE5adHZHSC14NHVDSlhDV0R3SU54UjFrVmttOWhxUkV5bnlwU2RYRkN4N0sza0FiaGRsQjNSeTFnTDVsbzNubElUVEpBbFAyYW8zV3IwTUNmX3pxUE94NEdNZ2ppYjM5akIxdzNxVU1jRGxFcXVleDF5Ul9RQUdfUU5BeHFhZWMwa2xhajNuclE9PSJ9"
        },
        {
            "id": 2,
            "collectionId": "sc-c6770b04-c37e-4a6d-98b3-a2cfe603dd8a",
            "ticket": "eyJkYXRhIjoiV212bGZKTmU3TnVscWZXYXVBeDRlUFlLX1UxemFNQVQ3TFJ6WWxrTUZoZTFFSmREaE9jc2VNYmphVTVVQ2JIVXJlODU3MVI4cC1hWFRhQ29IdUtSb1pCeXFGZW9SNHR4cWs1b0l3Z1lTWE82RUtOVVhXRnJ4TU9nb09fZExSQ0FlZ0VHOXVDd3BDRDNrYnlEdlFDZnZ5T1RUZEZkdW54aE0tN3lpUjkwaVpsdHFub1FYRFlNZWlRTkNBaWFadW9zVnNLN0ZvSlhWUVpCem9zSlFLZENMT3hmd1hsSWNhOVZINkFvTkpEVDd2M21oOE8xNWFKOWNqSnJqS2E3UmpKaGtULVVYMTJLMHNpa2FqcXhBalhLbTl1V3c2Ym9pTVR0bVpDX25sWmFvV1ZaWGx4WjhFQ2hpVmllZk12ajVxa1MiLCJrZXkiOiJCb004R09jVFozaWRlTTViOHZMT1RLbDEta2lHWnRkNmdYS3BELV9wd0pqaTc1SW9UejVmMjhrLV9WZTdXWWNCOG5KdUtIWE5tSEEzVm9PNTQzS2ZKRVZYb2RjczczS3hsbWVsYTlWUzJsZ2pwT2tfc29aenNkeXpzaWdqT0xhc0hpTWxWYW9xMG9QQnUzeVplOEZNMW8tVkdMcnpnemE2SzRtbkZPeDlmdU5tS2hlMVlnRzVCRUVtVFVzVkFVR1JvQzR5YlhnZlZ4cGplbFo5c1Nwb0NuVDNBam1PZmtDOEFaVkpkX0pqSWNhSVVoUnc4MWhxSTFZbGJud1pPb3h5Z0tnckw0a2JOTXNKcjRsZEs3a2gtZGsyWGprOTlwcUtuSGZkTVpySWh5cDMxWE5Zb1FKWnd0R3loU2R6aks5RU9KVEQ0Vk9haUNhNmdla1pwNVQxOFE9PSJ9"
        },
        {
            "id": 3,
            "collectionId": "sc-e6cd98e1-189d-461c-a814-93f3359c16f7",
            "ticket": "eyJkYXRhIjoiSUd1S3g5NmNmVGQzYXgtNmlodHI5bDdxaHJJVHZSYUpyeWt0OTFEWHpCQ0FMM3Y1UGFCZjJTWVVQOWdsRTJld3g1d0p6UllCbnhONXVwSGNreWE1eV9UbFF6RVV3VWlCLXJoTFNkd1hpMXU0YVpyQkxOdXRfVE5rR1plZFdBcXE1TmxlWlptSmJpcUdyZGViWnBwLS1LVzBGcElHZFEtVGYwenRnR3lrRXRVakFwXzBhQmZ2ZjZiVVZ2czRCYlFyMWZTOTJqTE9NRzhoRU5LZ2E2VDYxQnVvVkNqMm1OSE4zaHZfOFh5Vmp1Skx0czF1ZGpBdVQ2WEZUc1pwNzM4T1h4NHVNZTNNNTZEZzR5Vmd4QmZTdm5tODdVNlpncFRlOWk0LUxTVlM2UE9zLW15bHdqazY3bjlMb0dUR3Z6TzciLCJrZXkiOiJaNmNwd1h6OXJPd2VtU2NYbzRNVHdubkNaMFJlbnhrQWFobUY0VjNnNVVoTnJMQlJ1dEJHVjloNGl3Y2prWm1RSjluNnhTQlFURkJDTW9ETzFsQ1hqUVFsSnBOTWhmMk0tOUtKQnExejM1cHduZHZnbTVHTEFNUktLSGl1Z1lsdUEwS1BhWEF2aUs1UklWNUh6RXhkYWV3TldOWndYV1YtTXlVZUhURzg4RHp6ZjRpRmp6VXg0T3NELTJPSkNSRkpjdjNQb0Y1a1dpMDVYTWZzcmM5Q2VvQWxMYmdzaDh2WDRralVFOVUwUHc0LUdienUtTWVEcWVOcm5RNmdyTEJvdEFKV0liamE3Y0FEWDlOMHVIbUN1ME5MVHlmR2Y5OVJ2ZXUxbUlOYWktNkEtWnRlalo1QmxkRmhpd0lrTFJhaDQzaGEwaENhQzRzUUJpR2JUZFN6V2c9PSJ9"
        }
    ]
}
app.get('/weather/:weatherId/', (req, res) => {
    if (req.params.weatherId > 3) return res.send({"result": []})
    let day = req.query.day;
    let avg_hr = req.query.hr;
    var options = {
        method: 'GET',
        url: 'https://api.smartcity.kmitl.io/api/v1/collections/' + weatherCredential["cred"][req.params.weatherId-1]["collectionId"],
        qs: { 
            last: 60 * 60 * 24 * day ,
            limit: 30 * 24 * day * 4
        },
        headers:
        {
            Authorization: weatherCredential["cred"][req.params.weatherId-1]["ticket"]
        }
    };

    request(options, function (error, response, body) {
        if (error) throw new Error(error);
        let result = averageDataByHr(JSON.parse(body), avg_hr)
        res.send({"result": result})
    });
})

function averageDataByHr(data, hr){
    data = validateData(data)

    if (data.length < 2) return []
    const freq = data[1]["ts"] - data[0]["ts"]
    const period = 60 * 60 * hr * 1000
    var start_ts = data[0]["ts"]
    var end_ts = start_ts + period - freq
    var n = 0
    var avg_data = []
    var sum_data = {
        "rain": 0,
        "temperature": 0,
        "humidity": 0,
        "pm_1_0": 0,
        "pm_10": 0,
        "pm_2_5": 0
    }

    data.forEach((element, idx) => {
        if (element["ts"] > end_ts || idx == data.length-1) {
            (Object.keys(sum_data)).forEach(key => {
                sum_data[key] = Math.round((sum_data[key]/n)  * 1000) / 1000
            })
            sum_data["start_ts"] = start_ts
            sum_data["end_ts"] = end_ts
            avg_data.push(sum_data)

            n = 0
            sum_data = {
                "rain": 0,
                "temperature": 0,
                "humidity": 0,
                "pm_1_0": 0,
                "pm_10": 0,
                "pm_2_5": 0
            }
            start_ts = element["ts"]
            end_ts = end_ts + period
        }
        (Object.keys(sum_data)).forEach(key => {
            sum_data[key] += parseFloat(element[key])
        }) 
        n++;
    });
    return avg_data
}

function validateData(data){
    let obj = {};

    for (i = 0; i < data.length; i++) {
        obj[data[i]["ts"]] = data[i];
    }

    validated_data = new Array();
    for (var key in obj) {
        validated_data.push(obj[key]);
    }
    return validated_data
}

app.listen(port, () => console.log(`Example app listening on port ${port}!`))