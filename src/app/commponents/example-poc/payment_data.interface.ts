// Broker	Ramo	Sucursal Póliza	Número de Póliza	
// Número de Aviso	Identificación del Afectado	Nombre del Afectado	Cobertura	
// Documento de Pago	Fecha de Pago	Valor Pago	Fecha de Aviso	Fecha entrega 
// último documento	Contratante	Identificación titular	Nombre del titular	Fecha Elaboración 
// Solicitud	Número de Solicitud	Beneficiario	Número de Siniestro	Ejecutivo de Siniestros	
// Ejecutivo de Servicios	Ejecutivo Broker	Paso Actual(Pago)	Días de Pago	Estado Pago	Estado S
// IP Pago	Solicitud Recepción	Solicitud Concepto	Solicitud Banco	Solicitud Tipo Cuenta	Solicitud Cuenta	
// Pago Doc Url	Estado de Solicitud Evicertia	Fecha de Solicitud Evicertia	Fecha de Pago de Tesoreria	Lote 
// Pago Tesorería	Lote Pago Tesorería Observación	Correo Beneficiario


export interface PaymentData {
    Broker: string;
    Ramo: string;
    'Sucursal Póliza': string;
    'Número de Póliza': string;
    'Número de Aviso': string;
    'Identificación del Afectado': string;
    'Nombre del Afectado': string;
    Cobertura: string;
    'Documento de Pago': number;
    'Fecha de Pago': string;
    'Valor Pago': number;
    'Fecha de Aviso': string;
    'Fecha entrega último documento': string;
    Contratante: string;
    'Identificación titular': string;
    'Nombre del titular': string;
    'Fecha Elaboración Solicitud': string;
    'Número de Solicitud': string;
    Beneficiario: string;
    'Número de Siniestro': string;
    'Ejecutivo de Siniestros': string;
    'Ejecutivo de Servicios': string;
    'Ejecutivo Broker': string;
    'Paso Actual (Pago)': string;
    'Días de Pago': number;
    'Estado Pago': string;
    'Estado SIP Pago': string;
    'Solicitud Recepción': string;
    'Solicitud Concepto': string;
    'Solicitud Banco': string;
    'Solicitud Tipo Cuenta': string;
    'Solicitud Cuenta': string;
    'Pago Doc Url': string;
    'Estado de Solicitud Evicertia': string;
    'Fecha de Solicitud Evicertia': string;
    'Fecha de Pago de Tesoreria': string;
    'Lote Pago Tesorería': string;
    'Lote Pago Tesorería Observación': string;
    'Correo Beneficiario': string;
}
