import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

    function DayChart() {
      const [data, setData]= useState([]);
      const [concluido, setConcluido] = useState([]);
      const [erro, setErros] = useState([]);
      const [outros, setOutros] = useState([]);
      const [totalDay, setTotal]= useState([]);

      function getCurrentDate() {
        return new Date().toISOString().slice(0, 10);
      }
      
      const [todayDate] = useState(getCurrentDate());

      useEffect (() => {
       const getData = [];
       const getTotal = [];

// Puxa os dados da API e exibe no painél!
       const getDayData = async () => {
         const reqData = await fetch(`http://localhost:3001/getMyDay?date=${todayDate}`)
         const resData = await reqData.json()
         for (let i=0; i < resData.results.length; i++)
         {
            getData.push(resData.results[0].CONCLUIDO);
            getData.push(resData.results[0].ERRO);
            getData.push(resData.results[0].OUTROS);
         }
          // console.log(getData);
            setData(getData);
            setConcluido(getData[0]);
            setErros(getData[1]);
            setOutros(getData[2]);
        }    
        getDayData();

        const getTotalDay = async () => {
            const reqTotal = await fetch(`http://localhost:3001/getTotalDay?date=${todayDate}`)
            const resTotal = await reqTotal.json()
            for (let i=0; i < resTotal.results.length; i++)
            {
               getTotal.push(resTotal.results[0]["Processos RPA dia"]);
            }
               setTotal(getTotal);
           }    
             getTotalDay();
      },[]);

              return (
                  <>
                    <div className="col-xl-5">
                      <div className="card mb-4">
                        <div className="card-header bg-layout">
                      <div className="card-title">
                        <h3> Processos RPA Dia </h3></div>
                      <div className="card-subtitle">
                        <h6> {totalDay} </h6></div>
                        </div>
                      <div className="card-body-2 p-4">
                        <div className="chart-wrapper-day">
                            <Chart type="pie"
                               height={250}
                               series={data}
                               options={{
                                   labels: ['Concluídos', 'Erros', 'Outros'],
                                   colors: ['#139BFE', '#0051AA', '#FFFFFF'],
                                   chart: {
                                       type: 'pie',
                                       foreColor: '#FFFFFF',
                                       fontFamily: 'Inter',
                                   },
                                   dataLabels: {
                                       enabled: false,
                                   },
                                   tooltip: {
                                       enabled: true,
                                       enabledOnSeries: undefined,
                                       shared: true,
                                       followCursor: false,
                                       intersect: false,
                                       inverseOrder: false,
                                       custom: undefined,
                                       fillSeriesColor: true,
                                       theme: false,
                                       style: {
                                       fontSize: '14px',
                                       color: ['#000'],
                                       },
                                       onDatasetHover: {
                                           highlightDataSeries: true,
                                       },
                                   },
                                   stroke: {
                                       show: true,
                                       width: 3,
                                       colors: ['transparent']
                                   },
                                   legend: {
                                       show: false,
                                       showForSingleSeries: false,
                                       showForNullSeries: true,
                                       showForZeroSeries: true,
                                       position: 'right',
                                       horizontalAlign: 'right', 
                                       floating: false,
                                       fontSize: '14px',
                                       fontFamily: 'Inter',
                                       fontWeight: 400,
                                       formatter: undefined,
                                       inverseOrder: false,
                                       width: undefined,
                                       height: undefined,
                                       tooltipHoverFormatter: undefined,
                                       customLegendItems: [],
                                       offsetX: 40,
                                       offsetY: 50,
                                   }}}
                            />
                        <div className="chart-day-legend">
                          <div className="chart-legend-sucess">
                            <div className="legend-square-sucess"/>
                              <h1> {concluido} </h1>
                          </div>
                          <div className="chart-legend-error">
                            <div className="legend-square-error"/>
                            <h1> {erro} </h1>
                          </div>
                          <div className="chart-legend-others">
                          <div className="legend-square-others"/>
                            <h1> {outros} </h1>
                          </div>
                        </div>
                        <div className="chart-status-bar">
                          <h1> Concluído </h1>
                          <h1> Erros </h1>
                          <h1> Outros </h1>
                        </div>
                        </div>
                        </div>
                        </div>
                      </div>
        </>
    );
};

export default DayChart;