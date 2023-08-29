import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localeEsAr from '@angular/common/locales/es-AR';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgxSpinnerModule } from 'ngx-spinner'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { LoginComponent } from './Pages/Home-Login/login/login.component';
import { HomeComponent } from './Pages/Home-Login/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AltaClienteComponent } from './Pages/Clientes/alta-cliente/alta-cliente.component';
import { ModificacionClienteComponent } from './Pages/Clientes/modificacion-cliente/modificacion-cliente.component';
import { ListadoClientesComponent } from './Pages/Clientes/listado-clientes/listado-clientes.component';
import { VistaClienteComponent } from './Pages/Clientes/vista-cliente/vista-cliente.component';
import { HttpClientModule } from '@angular/common/http';
import { EdadPipe } from './Pipes/edad.pipe';
import { DatePipe } from '@angular/common';
import { AltaTransaccionComponent } from './Pages/Transacciones/alta-transaccion/alta-transaccion.component';
import { ListadoTransaccionesComponent } from './Pages/Transacciones/listado-transacciones/listado-transacciones.component';
import { VistaTransaccionComponent } from './Pages/Transacciones/vista-transaccion/vista-transaccion.component';
import { ModificarTransaccionComponent } from './Pages/Transacciones/modificar-transaccion/modificar-transaccion.component';
import { AltaprestamoComponent } from './Pages/Prestamos/altaprestamo/altaprestamo.component';
import { ModificarPrestamoComponent } from './Pages/Prestamos/modificar-prestamo/modificar-prestamo.component';
import { ListadoPrestamoComponent } from './Pages/Prestamos/listado-prestamo/listado-prestamo.component';
import { VistaPrestamoComponent } from './Pages/Prestamos/vista-prestamo/vista-prestamo.component';
import { RegistroCuotaComponent } from './Pages/Cuotas/registro-cuota/registro-cuota.component';
import { ModificarCuotaComponent } from './Pages/Cuotas/modificar-cuota/modificar-cuota.component';
import { ListadoCuotasComponent } from './Pages/Cuotas/listado-cuotas/listado-cuotas.component';
import { VistaCuotaComponent } from './Pages/Cuotas/vista-cuota/vista-cuota.component';
import { GeneralComponent } from './Pages/Prestamos/general/general.component';
import { ListadoPuntajeComponent } from './Pages/Puntos/listado-puntaje/listado-puntaje.component';
import { ReporteCuotasComponent } from './Pages/Reportes/reporte-cuotas/reporte-cuotas.component';
import { ReporteRecaudacionMensualComponent } from './Pages/Reportes/reporte-recaudacion-mensual/reporte-recaudacion-mensual.component';
import { ReporteVariacionDolarIndiceComponent } from './Pages/Reportes/reporte-variacion-dolar-indice/reporte-variacion-dolar-indice.component';
import { ReporteClientesPrestamosComponent } from './Pages/Reportes/reporte-clientes-prestamos/reporte-clientes-prestamos.component';
import { ReporteBalanceRecomendacionComponent } from './Pages/Reportes/reporte-balance-recomendacion/reporte-balance-recomendacion.component';
import { ReporteHistoricoPagosComponent } from './Pages/Reportes/reporte-historico-pagos/reporte-historico-pagos.component';
import { NgChartsModule } from 'ng2-charts';
import { NavbarComponent } from './Pages/Home-Login/navbar/navbar.component';
import { AltaUsuarioComponent } from './Pages/Usuarios/alta-usuario/alta-usuario.component';
import { ModificarUsuarioComponent } from './Pages/Usuarios/modificar-usuario/modificar-usuario.component';
import { ListadoUsuarioComponent } from './Pages/Usuarios/listado-usuario/listado-usuario.component';
import { VistaUsuarioComponent } from './Pages/Usuarios/vista-usuario/vista-usuario.component';
import { DashboardComponent } from './Pages/Home-Login/dashboard/dashboard.component';
import { PuntajeClienteComponent } from './Pages/Puntos/puntaje-cliente/puntaje-cliente.component';
import { DataTablesModule } from 'angular-datatables'

registerLocaleData(localeEsAr);

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    AltaClienteComponent,
    ModificacionClienteComponent,
    ListadoClientesComponent,
    VistaClienteComponent,
    EdadPipe,
    AltaTransaccionComponent,
    ListadoTransaccionesComponent,
    VistaTransaccionComponent,
    ModificarTransaccionComponent,
    AltaprestamoComponent,
    ModificarPrestamoComponent,
    ListadoPrestamoComponent,
    VistaPrestamoComponent,
    RegistroCuotaComponent,
    ModificarCuotaComponent,
    ListadoCuotasComponent,
    VistaCuotaComponent,
    GeneralComponent,
    ListadoPuntajeComponent,
    ReporteCuotasComponent,
    ReporteRecaudacionMensualComponent,
    ReporteVariacionDolarIndiceComponent,
    ReporteClientesPrestamosComponent,
    ReporteBalanceRecomendacionComponent,
    ReporteHistoricoPagosComponent,
    NavbarComponent,
    AltaUsuarioComponent,
    ModificarUsuarioComponent,
    ListadoUsuarioComponent,
    VistaUsuarioComponent,
    DashboardComponent,
    PuntajeClienteComponent
  ],
  imports: [
    DataTablesModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    NgChartsModule,
    NgxSpinnerModule
    //NgxChartsModule
  ],
  providers: [
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }


