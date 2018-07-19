import { Component, OnInit, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { PaginationModule } from 'ng2-bootstrap';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { FileUploadModule } from 'ng2-file-upload';
import { PageComponent } from 'app/pagination/page.component';

import { NavComponent } from './nav.component';
import { DashboardComponent } from './dashboard.component';
import { lineChartsComponent } from '../charts/lineCharts/lineCharts.component';
import { pieChartsComponent } from '../charts/pieCharts/pieCharts.component';
import { DatatableComponent } from '../tables/datatable/datatable.component';
import { BootstrapComponent } from '../bootstraps/static/bootstrap.component';
import { PluginComponent } from '../bootstraps/plugin/plugin.component';

import { BrowserModule } from '@angular/platform-browser';
import { routeManagementComponent } from '../routeManagement/routeManagement.component';
import { versionManagementComponent } from '../versionManagement/versionManagement.component';
import { healthCheckupComponent } from '../healthCheckup/healthCheckup.component';
import { performanceMonitoringAllComponent } from '../performanceMonitoringAll/performanceMonitoringAll.component';
import { logCheckupComponent } from '../logCheckup/logCheckup.component';
import { performanceMonitoringComponent } from '../performanceMonitoring/performanceMonitoring.component';
import { atomAPIComponent } from '../APIs/atomAPI/atom.component';
import { combinationAPIComponent } from '../APIs/combinationAPI/combinationAPI';
import { HttpModule, JsonpModule } from '@angular/http';
import { ApiService } from '../APIs/api.service';
import { creatAtomAPIComponent } from '../creatAtomAPI/createAtomAPI.compoment';
import { RouteService } from 'app/routeManagement/route.service';
import { CreateAtomApiService } from '../creatAtomAPI/create-atom-api.service';
import { LogService } from '../logCheckup/log.service';
import { ModifyAtomApiComponent } from '../modify-atom-api/modify-atom-api.component';
import { ModifyAtomApiService } from '../modify-atom-api/modify-atom-api.service';
import { flowControlComponent } from '../flowControl/flowControl.component';
import { FlowcontrolService } from '../flowControl/flowcontrol.service';
import { CombinationApiService } from '../APIs/combinationAPI/combination-api.service';


const tablesRoutes: Routes = [
    {
        path: 'main/:id',
        component: NavComponent,
        children: [
            { path: '', component: DashboardComponent },
            { path: 'dashboard', component: DashboardComponent },
            { path: 'lineCharts', component: lineChartsComponent },
            { path: 'pieCharts', component: pieChartsComponent },
            { path: 'datatable', component: DatatableComponent },
            { path: 'bootstrap-static', component: BootstrapComponent },
            { path: 'bootstrap-plugin', component: PluginComponent },

            { path: 'atomAPI', component: atomAPIComponent },
            { path: 'combinationAPI', component: combinationAPIComponent },
            { path: 'routeManagement', component: routeManagementComponent },
            { path: 'atomAPI/versionManagement', component: versionManagementComponent },
            { path: 'combinationAPI/versionManagement', component: versionManagementComponent },
            { path: 'healthCheckup', component: healthCheckupComponent },
            { path: 'performanceMonitoringAll', component: performanceMonitoringAllComponent },
            { path: 'performanceMonitoringAll/logCheckup', component: logCheckupComponent },
            { path: 'atomAPI/performanceMonitoring', component: performanceMonitoringComponent },
            { path: 'atomAPI/performanceMonitoring/logCheckup', component: logCheckupComponent },
            { path: 'atomAPI/routeManagement', component: routeManagementComponent },
            { path: 'combineAPI/performanceMonitoring', component: performanceMonitoringComponent },
            { path: 'combineAPI/performanceMonitoring/logCheckup', component: logCheckupComponent },
            { path: 'combineAPI/routeManagement', component: routeManagementComponent },
            //创建原子API
            { path: 'atomAPI/createAtomAPI', component: creatAtomAPIComponent },
            //修改原子API
            { path: 'atomAPI/modifyAtomAPI', component: ModifyAtomApiComponent },
            { path: 'flowControl', component: flowControlComponent }

        ]
    }
]


@NgModule({
    imports: [
        FormsModule,
        CommonModule,
        RouterModule.forChild(tablesRoutes),
        ChartsModule,
        PaginationModule.forRoot(),
        Ng2SmartTableModule,
        FileUploadModule,
        BrowserModule,
        //调用后台接口就必须引入以下两个module。
        HttpModule,
        JsonpModule

    ],
    declarations: [
        NavComponent,
        DashboardComponent,
        lineChartsComponent,
        pieChartsComponent,
        DatatableComponent,
        BootstrapComponent,
        PluginComponent,

        atomAPIComponent,
        combinationAPIComponent,
        routeManagementComponent,
        versionManagementComponent,
        healthCheckupComponent,
        performanceMonitoringAllComponent,
        logCheckupComponent,
        performanceMonitoringComponent,
        //创建原子API
        creatAtomAPIComponent,
        // 修改原子API
        ModifyAtomApiComponent,
        flowControlComponent,
        PageComponent
    ],
    providers: [ApiService, RouteService, CreateAtomApiService, LogService,ModifyAtomApiService,FlowcontrolService,CombinationApiService]
})
export class DashboardModule { }
