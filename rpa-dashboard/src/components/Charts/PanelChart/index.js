// import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

    function PanelChart () {
        // const [data, setData]= useState([]);

        // useEffect(() => {
        // }, []);

        return (
                <>
                    <Chart type="donut" 
                           height={280}
                           series={[50, 50, 50]}
                           options={{
                            colors: ['#139BFE', '#0051AA', '#FFFFFF'],
                            chart: {
                              type: 'donut',
                              foreColor: '#FFFFFF',
                              fontFamily: 'Inter',
                              offsetX: 30,
                              offsetY: 60,
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
                              labels: ['Concluídos', 'Erros', 'Outros'],
                              responsive: [{
                              breakpoint: 480,
                            }],
                            legend: {
                              show: true,
                              showForSingleSeries: false,
                              showForNullSeries: true,
                              showForZeroSeries: true,
                              position: 'bottom',
                              horizontalAlign: 'center', 
                              floating: false,
                              fontSize: '16px',
                              fontFamily: 'Inter',
                              fontWeight: 400,
                              formatter: undefined,
                              inverseOrder: false,
                              tooltipHoverFormatter: undefined,
                              customLegendItems: [],
                              offsetX: 40,
                              offsetY: 80,
                            }
                        }}
                    />
                </>
        );
    };

export default PanelChart;