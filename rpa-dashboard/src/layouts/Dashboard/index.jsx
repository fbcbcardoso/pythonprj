import "./styles.css";

import { useEffect } from "react";

import Sidebar from "../../components/Sidebar";
import Navbar from "../../components/Navbar";

import DayChart from "../../components/Charts/DayChart";
import PeriodChart from "../../components/Charts/PeriodChart";
import TableChart from '../../components/Charts/TableChart/data/index';
import ProdChart from "../../components/Charts/ProdChart";
import PanelChart from "../../components/Charts/PanelChart";

import { BsBox } from "react-icons/bs";
import { IoDiamondOutline } from "react-icons/io5";
import { RxRocket } from "react-icons/rx";

const Dashboard = () => {
    useEffect(() => {
      const reloadPage = () => {
          window.location.reload();
      };

      const intervalId = setTimeout(reloadPage,  5 * 60 * 1000)

      return () => {
          clearTimeout(intervalId);
      }
    }, [])
    
          return (
              <div className="wrapper">
                <Sidebar /> 
                  <div className="main">
                <Navbar />
                  <div className="flex flex-col flex-1">
                    <div className="container-lg">

                    {/* RPA Período */}
                    <div className="row mb-4">
                      <PeriodChart />

                    {/* RPA Dia */}
                        <DayChart/>
                    </div>

                    {/* Tabela */}
                    <div className="row">
                      <div className="col-xl-9">
                        <TableChart />
                      </div>
                      
                    {/* Em Produção */}
                        <ProdChart />
                      </div>
                    </div>

                    {/* Painéis */}
                    <div className="row sm:px-6 lg:px-8">
                      <div className="col-xl-4">
                        <div className="card mb-4 mt-4 br-14">
                         <div className="card-header-panels">
                            <div className="panels-icon bg-icon-success">
                              <BsBox className="p-icon-box"/>
                            </div>
                            <div className="panels-title">
                              <h3> ECAC </h3>
                                <h3> Caixa Postal </h3>
                            </div>
                          </div>
                          <div className="panels-body p-4">
                            <div className="chart-wrapper-panel">
                              <PanelChart/>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-4">
                        <div className="card mb-4 mt-4 br-14">
                         <div className="card-header-panels">
                            <div className="panels-icon bg-icon-others">
                              <BsBox className="p-icon-box"/>
                            </div>
                            <div className="panels-title">
                              <h3> FGTS </h3>
                                <h3> </h3>
                            </div>
                          </div>
                          <div className="panels-body p-4">
                            <div className="chart-wrapper-panel">
                              <PanelChart />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="col-xl-4">
                        <div className="card mb-4 mt-4 br-14">
                         <div className="card-header-panels">
                            <div className="panels-icon bg-icon-error">
                              <IoDiamondOutline className="p-icon-diamond"/>
                            </div>
                            <div className="panels-title">
                              <h3> Monitoramento </h3>
                                <h3> </h3>
                            </div>
                          </div>
                          <div className="panels-body p-4">
                            <div className="chart-wrapper-panel">
                              <PanelChart />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="col-xl-4">
                        <div className="card mb-4 mt-4 br-14">
                         <div className="card-header-panels">
                            <div className="panels-icon bg-icon-error">
                              <BsBox className="p-icon-diamond"/>
                            </div>
                            <div className="panels-title">
                              <h3> Monitoramento Licenças </h3>
                                <h3> FortiCloud </h3>
                            </div>
                          </div>
                          <div className="panels-body p-4">
                            <div className="chart-wrapper-panel">
                              <PanelChart />
                            </div>
                          </div>
                        </div>
                      </div>
                      </div>

                    <div className="row sm:px-6 lg:px-8">
                        <div className="col-xl-4">
                          <div className="card mb-4 mt-4 br-14">
                           <div className="card-header-panels-2">
                              <div className="panels-icon-2 bg-icon-success">
                                <RxRocket className="p-icon-rocket"/>
                              </div>
                              <div className="panels-title-2">
                                <h3> ECAC </h3>
                                  <h3> Situação Fiscal </h3>
                              </div>
                            </div>
                            <div className="panels-body p-4">
                              <div className="chart-wrapper-panel">
                                <PanelChart />
                              </div>
                            </div>
                          </div>
                        </div>
            
                        <div className="col-xl-4">
                          <div className="card mb-4 mt-4 br-14">
                           <div className="card-header-panels-2">
                              <div className="panels-icon-2 bg-icon-others">
                                <BsBox className="p-icon-diamond" />
                              </div>
                              <div className="panels-title">
                                <h3> Consulta_Aux_Doença </h3>
                                  <h3> </h3>
                              </div>
                            </div>
                            <div className="panels-body p-4">
                              <div className="chart-wrapper-panel">
                                <PanelChart />
                              </div>
                            </div>
                          </div>
                        </div>
            
                        <div className="col-xl-4">
                        <div className="card mb-4 mt-4 br-14">
                         <div className="card-header-panels-2">
                            <div className="panels-icon-2 bg-icon-others">
                              <BsBox className="p-icon-diamond" />
                            </div>
                            <div className="panels-title">
                              <h3> Consulta_Aux_Doença </h3>
                                <h3> </h3>
                            </div>
                          </div>
                          <div className="panels-body p-4">
                            <div className="chart-wrapper-panel">
                              <PanelChart />
                            </div>
                          </div>
                        </div>
                        </div>
            
                        <div className="col-xl-4">
                        <div className="card mb-4 mt-4 br-14">
                         <div className="card-header-panels-2">
                            <div className="panels-icon-2 bg-icon-others">
                              <BsBox className="p-icon-diamond" />
                            </div>
                            <div className="panels-title">
                              <h3> Consulta_Aux_Doença </h3>
                                <h3> </h3>
                            </div>
                          </div>
                          <div className="panels-body p-4">
                            <div className="chart-wrapper-panel">
                              <PanelChart />
                            </div>
                          </div>
                        </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
  );
};


export default Dashboard;