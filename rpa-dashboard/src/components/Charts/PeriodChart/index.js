import { subMonths, format } from "date-fns";
import { useState, useEffect } from "react";
import Chart from "react-apexcharts";

function PeriodChart () {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [concluido, setConcluido] = useState([]);
  const [erro, setErros] = useState([]);
  const [outros, setOutros] = useState([]);
  const [category, setCategory] = useState([]);

  const [totalPeriodo, setTotal]= useState([]);

  const [legendTotal, setLegendTotal] = useState([]);
  const [legendConcluido, setLegendConcluido] = useState([]);
  const [legendErro, setLegendErro] = useState([]);
  const [legendOutros, setLegendOutros] = useState([]);

  useEffect(() => {
    const getConcluido=[];
    const getErro=[];
    const getOutros=[];

    const getCategory=[];
    const getTotal=[];

    const getLegend=[];

  // Puxa os dados da API e exibe no painél!
    const getPeriodData = async () => {
      const currentDate = new Date(); // Obtém a data atual
      const startDate = subMonths(currentDate, 6); // Subtrai 6 meses da data atual
    
      const formattedStartDate = format(startDate, "yyyy-MM-dd");
      const formattedEndDate = format(currentDate, "yyyy-MM-dd");
    
      const reqData = await fetch(`http://localhost:3001/getMyPeriodo?date1=${formattedStartDate}&date2=${formattedEndDate}`);
      const resData = await reqData.json();

      for (let i = 0; i < resData.results.length; i++) {
        //Categorias:
          getCategory.push(resData.results[i].PERIODO);
          getConcluido.push(resData.results[i].CONCLUIDO);
          getErro.push(resData.results[i].ERRO);
          getOutros.push(resData.results[i].OUTROS);
      } 
          setConcluido(getConcluido);
          setErros(getErro);
          setOutros(getOutros);

        setCategory(getCategory);
    }
      getPeriodData();

      const getTotalPeriodo = async () => {
        const currentDate = new Date();
        const startDate = subMonths(currentDate, 6);

        const formattedStartDate = format(startDate, "yyyy-MM-dd");
        const formattedEndDate = format(currentDate, "yyyy-MM-dd");

        const reqTotal = await fetch(`http://localhost:3001/getTotalPeriodo?date1=${formattedStartDate}&date2=${formattedEndDate}`);
        const resTotal = await reqTotal.json();

        for (let i=0; i < resTotal.results.length; i++)
        {
           getTotal.push(resTotal.results[0]["Processos RPA Periodo"]);
        }
           setTotal(getTotal);
       }    
          getTotalPeriodo();

        const getLegenda = async () => {
          const currentDate = new Date();
          const startDate = subMonths(currentDate, 6);
                
          const formattedStartDate = format(startDate, "yyyy-MM-dd");
          const formattedEndDate = format(currentDate, "yyyy-MM-dd");
                
          const reqData = await fetch(`http://localhost:3001/getLegendaPeriodo?date1=${formattedStartDate}&date2=${formattedEndDate}`);
          const resData = await reqData.json();

         for (let i=0; i < resData.results.length; i++)
          {
            getLegend.push(resData.results[0].CONCLUIDO);
            getLegend.push(resData.results[0].ERRO);
            getLegend.push(resData.results[0].OUTROS);
          }
          setLegendTotal(getLegend);
                    
          setLegendConcluido(getLegend[0]);
          setLegendErro(getLegend[1]);
          setLegendOutros(getLegend[2]);
        }
          getLegenda();
  }, []);

  return (
          <>
            <div className="col-xl-6">
              <div className="card mb-4">
                <div className="card-header bg-layout">
                  <div className="card-title">
                    <h3> Processos RPA Período </h3>
                  </div>
                  <div className="card-subtitle">
                    <h6> {totalPeriodo} </h6></div>
                  </div>
                <div className="card-body p-4">
                  <div className="chart-wrapper-period bg-chart">

                    {/* Filtro do Período entre duas datas: */}
                    <div className="relative left-[560px] cursor-pointer">
                      <div className="w-[135px] h-8 left-0 top-0 absolute bg-gradient-to-b from-pastel-blue
                                     to-dark-blue rounded shadow border border-neutral-800" 
                        />
                        <div className="w-[129px] h-4 left-[12px] top-[8px] absolute text-white text-[12px] 
                                        font-semibold leading-tight tracking-wide"
                        > 
                          Selecionar Datas
                        </div>
                    </div>
                      <Chart type="bar" 
                        height={300}
                        width={560}
                        series={[
                          {
                            name: 'Concluídos',
                            data: concluido,
                          }, 
                          {
                            name: 'Erros',
                            data: erro,
                          }, 
                          {
                            name: 'Outros',
                            data: outros,
                          },
                        ]}
                          options={{
                            colors: ['#139BFE', '#0051AA', '#FFFFFF'],
                            chart: {
                              type: 'bar',
                              foreColor: '#FFFFFF',
                              fontFamily: 'Inter',
                            toolbar: {
                              show: false,
                            }
                          },
                            plotOptions: {
                              bar: {
                                horizontal: false,
                                columnWidth: '70%',
                                endingShape: 'rounded',
                              },
                            },
                            dataLabels: {
                              enabled: false,
                            },
                            stroke: {
                              show: true,
                              width: 3,
                              colors: ['transparent']
                            },
                            xaxis: {
                              categories: category,
                            },
                            yaxis: {
                              title: {
                                colors: ['#FFFFF'],
                              }
                            },
                            fill: {
                              opacity: 1,
                              colors: ['#139BFE', '#0051AA', '#FFFFFF'],
                            },
                            tooltip: {
                              enabled: true,
                              enabledOnSeries: undefined,
                              shared: true,
                              followCursor: false,
                              intersect: false,
                              inverseOrder: false,
                              custom: undefined,
                              fillSeriesColor: false,
                              theme: false,
                              style: {
                                fontSize: '14px',
                              },
                              onDatasetHover: {
                                  highlightDataSeries: true,
                              },
                            },
                            legend: {
                              show: false,
                              position: 'bottom',
                              horizontalAlign: 'center',
                              floating: false,
                              fontSize: '14px',
                              fontFamily: 'Inter',
                              fontWeight: 400,
                              formatter: undefined,
                              inverseOrder: false,
                              tooltipHoverFormatter: undefined,
                              offsetX: 0,
                              offsetY: 10,
                            },
                          }}
                      />
                    {/* Legenda: */}
                      <div className="chart-period-legend">
                        <div className="chart-period-legend-sucess">
                          <div className="legend-square-sucess mr-2"/>
                              <h1 className="mr-2"> {legendConcluido} </h1>
                            <h1> Concluídos </h1>
                        </div>
                        <div className="chart-period-legend-error">
                          <div className="legend-square-error mr-2"/>
                            <h1 className="mr-2"> {legendErro} </h1>
                          <h1> Erros </h1>
                        </div>
                        <div className="chart-period-legend-others">
                        <div className="legend-square-others mr-2"/>
                            <h1 className="mr-2"> {legendOutros} </h1>
                          <h1> Outros </h1>
                        </div>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </>
  );
};

export default PeriodChart;