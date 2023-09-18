import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

    function ProdChart() {
      const [data, setData]= useState([]);
      const [emProd, setEmProd] = useState([]);

      useEffect (() => {
       const getData = [];
       const getEmProd = [];

    // Puxa os dados da API e exibe no painél!
       const getProdData = async () => {
        const reqData = await fetch(`http://localhost:3001/getMyProd`)
        const resData = await reqData.json()
          {
              getData.push(resData.Executado)
              getData.push(resData["Não Executado"])
              
              getEmProd.push(resData.Produção)
          }

        console.log(getData);
            setData(getData);
            setEmProd(getEmProd);
        }    
            getProdData();
      },[]);

              return (
                        <>
                          <div className="col-xl-3">
                            <div className="card mb-4 mt-4">
                                <div className="card-header-prod bg-layout">
                                  <div className="card-title-prod">
                                      <h3> Em Produção </h3>
                                    </div>
                                  <div className="card-subtitle-prod">
                                      <h6> {emProd} </h6>
                                    </div>
                                  </div>
                                <div className="card-body-2 p-4">
                                  <div className="flex flex-col items-center space-y-9">
                                    <Chart 
                                      type="pie"
                                      height={225}
                                      series={data}
                                      options={{
                                        labels: ['Concluídos', 'Erros'],
                                        colors: ['#139BFE', '#0051AA',],
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
                                    <div className="flex items-center pt-30">
                                      <div className="w-3 h-3 bg-blue-sucess mr-2"/>
                                        <h1 className="mr-2"> 12 </h1>
                                        <h1> Executado </h1>
                                      <div className="w-3 h-3 bg-blue-error ml-4 mr-2"/>
                                        <h1 className="mr-2"> 12 </h1>
                                        <h1> Não Executado </h1>
                                    </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </>
    );
};

export default ProdChart;