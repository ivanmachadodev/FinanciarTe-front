import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Pages/Home-Login/login/login.component';
import { AltaClienteComponent } from './Pages/Clientes/alta-cliente/alta-cliente.component';
import { ModificacionClienteComponent } from './Pages/Clientes/modificacion-cliente/modificacion-cliente.component';
import { ListadoClientesComponent } from './Pages/Clientes/listado-clientes/listado-clientes.component';
import { VistaClienteComponent } from './Pages/Clientes/vista-cliente/vista-cliente.component';
import { AltaTransaccionComponent } from './Pages/Transacciones/alta-transaccion/alta-transaccion.component';
import { ModificarTransaccionComponent } from './Pages/Transacciones/modificar-transaccion/modificar-transaccion.component';
import { ListadoTransaccionesComponent } from './Pages/Transacciones/listado-transacciones/listado-transacciones.component';
import { VistaTransaccionComponent } from './Pages/Transacciones/vista-transaccion/vista-transaccion.component';
import { HomeComponent } from './Pages/Home-Login/home/home.component';
import { AltaprestamoComponent } from './Pages/Prestamos/altaprestamo/altaprestamo.component';
import { ListadoPrestamoComponent } from './Pages/Prestamos/listado-prestamo/listado-prestamo.component';
import { ModificarPrestamoComponent } from './Pages/Prestamos/modificar-prestamo/modificar-prestamo.component';
import { VistaPrestamoComponent } from './Pages/Prestamos/vista-prestamo/vista-prestamo.component';
import { RegistroCuotaComponent } from './Pages/Cuotas/registro-cuota/registro-cuota.component';
import { ListadoCuotasComponent } from './Pages/Cuotas/listado-cuotas/listado-cuotas.component';
import { ModificarCuotaComponent } from './Pages/Cuotas/modificar-cuota/modificar-cuota.component';
import { VistaCuotaComponent } from './Pages/Cuotas/vista-cuota/vista-cuota.component';
import { GeneralComponent } from './Pages/Prestamos/general/general.component';
import { ReporteVariacionDolarIndiceComponent } from './Pages/Reportes/reporte-variacion-dolar-indice/reporte-variacion-dolar-indice.component';
import { ReporteBalanceRecomendacionComponent } from './Pages/Reportes/reporte-balance-recomendacion/reporte-balance-recomendacion.component';
import { ReporteClientesPrestamosComponent } from './Pages/Reportes/reporte-clientes-prestamos/reporte-clientes-prestamos.component';
import { ReporteCuotasComponent } from './Pages/Reportes/reporte-cuotas/reporte-cuotas.component';
import { ReporteHistoricoPagosComponent } from './Pages/Reportes/reporte-historico-pagos/reporte-historico-pagos.component';
import { ReporteRecaudacionMensualComponent } from './Pages/Reportes/reporte-recaudacion-mensual/reporte-recaudacion-mensual.component';
import { AltaUsuarioComponent } from './Pages/Usuarios/alta-usuario/alta-usuario.component';
import { ModificarUsuarioComponent } from './Pages/Usuarios/modificar-usuario/modificar-usuario.component';
import { ListadoUsuarioComponent } from './Pages/Usuarios/listado-usuario/listado-usuario.component';
import { VistaUsuarioComponent } from './Pages/Usuarios/vista-usuario/vista-usuario.component';
import { GuardAuthGuard } from './Security/guard-auth.guard';
import { DashboardComponent } from './Pages/Home-Login/dashboard/dashboard.component';
import { ListadoPuntajeComponent } from './Pages/Puntos/listado-puntaje/listado-puntaje.component';
import { PuntajeClienteComponent } from './Pages/Puntos/puntaje-cliente/puntaje-cliente.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: "login", component: LoginComponent },
  { path: "dashboard", component: DashboardComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "clientes/alta", component: AltaClienteComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "clientes/modificar/:id", component: ModificacionClienteComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] }  },
  { path: "clientes/listado", component: ListadoClientesComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "clientes/vista/:id", component: VistaClienteComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "transacciones/registrar", component: AltaTransaccionComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "transacciones/modificar/:id", component:  ModificarTransaccionComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] }  },
  { path: "transacciones/listado", component: ListadoTransaccionesComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "transacciones/vista/:id", component: VistaTransaccionComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "prestamos/listadogeneral", component: GeneralComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "prestamos/alta", component: AltaprestamoComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "prestamos/listado/:id", component: ListadoPrestamoComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "prestamos/modificar/:id", component: ModificarPrestamoComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "prestamos/vista/:id", component: VistaPrestamoComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "cuotas/alta/:id", component: RegistroCuotaComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "cuotas/listado/:id", component: ListadoCuotasComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "cuotas/modificar/:id", component: ModificarCuotaComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "puntos/listado", component: ListadoPuntajeComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "puntos/puntaje-cliente/:id", component: PuntajeClienteComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "usuarios/alta", component: AltaUsuarioComponent, canActivate: [GuardAuthGuard], data: { roles: ['Administrador', 'CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "usuarios/modificar/:id", component: ModificarUsuarioComponent, canActivate: [GuardAuthGuard], data: { roles: ['Administrador', 'CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] }  },
  { path: "usuarios/listado", component: ListadoUsuarioComponent, canActivate: [GuardAuthGuard], data: { roles: ['Administrador', 'CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "usuarios/vista/:id", component: VistaUsuarioComponent, canActivate: [GuardAuthGuard], data: { roles: ['Administrador', 'CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "reportes/dolar-indice", component: ReporteVariacionDolarIndiceComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "reportes/balance", component: ReporteBalanceRecomendacionComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "reportes/clientes", component: ReporteClientesPrestamosComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "reportes/cuotas", component: ReporteCuotasComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "reportes/pagos", component: ReporteHistoricoPagosComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "reportes/recaudacion", component: ReporteRecaudacionMensualComponent, canActivate: [GuardAuthGuard], data: { roles: ['CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: "home", component: HomeComponent, canActivate: [GuardAuthGuard], data: { roles: ['Administrador','CEO', 'Director', 'Gerente', 'Jefe', 'Agente'] } },
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
