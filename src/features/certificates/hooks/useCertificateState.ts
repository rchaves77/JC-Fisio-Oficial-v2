import { useState, useEffect } from 'react';
import { AttendanceCertificate } from '../../../types';

const LOCAL_STORAGE_KEY = 'jc_fisioterapia_certificates_v1';

export function useCertificateState() {
  const [certificates, setCertificates] = useState<AttendanceCertificate[]>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error('Error loading certificates', e);
    }
    return [
      {
        id: 'JC-DECL-2026-8801',
        patientId: 'p1',
        patientName: 'Maria Silva Oliveira',
        patientCpf: '123.456.789-01',
        appointmentDate: new Date().toISOString().split('T')[0],
        timeSlot: '08:00 - 09:00',
        physioName: 'Dr. Jucelino Castro',
        physioCrefito: 'CREFITO-3/184920-F',
        receptionistName: 'Katiuscia Braga Castro',
        issuedAt: new Date().toISOString(),
        clinicName: 'JC Fisioterapia & Reabilitação',
        validationUrl: `${window.location.origin}?validar=JC-DECL-2026-8801`,
        status: 'valid',
      },
    ];
  });

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(certificates));
  }, [certificates]);

  const generateCertificate = (data: {
    patientId: string;
    patientName: string;
    patientCpf?: string;
    appointmentDate?: string;
    timeSlot?: string;
    physioName?: string;
    physioCrefito?: string;
    receptionistName?: string;
  }): AttendanceCertificate => {
    const todayStr = new Date().toISOString().split('T')[0];
    const codeNum = Math.floor(1000 + Math.random() * 9000);
    const certId = `JC-DECL-${new Date().getFullYear()}-${codeNum}`;
    const baseUrl = window.location.origin + window.location.pathname;

    const newCert: AttendanceCertificate = {
      id: certId,
      patientId: data.patientId,
      patientName: data.patientName,
      patientCpf: data.patientCpf || '123.456.789-00',
      appointmentDate: data.appointmentDate || todayStr,
      timeSlot: data.timeSlot || '08:00 às 09:00',
      physioName: data.physioName || 'Dr. Jucelino Castro',
      physioCrefito: data.physioCrefito || 'CREFITO-3/184920-F',
      receptionistName: data.receptionistName || 'Katiuscia Braga Castro',
      issuedAt: new Date().toISOString(),
      clinicName: 'JC Fisioterapia & Reabilitação Especializada',
      validationUrl: `${baseUrl}?validar=${certId}`,
      status: 'valid',
    };

    setCertificates((prev) => [newCert, ...prev]);
    return newCert;
  };

  const getCertificateById = (id: string): AttendanceCertificate | undefined => {
    const cleaned = id.trim().toUpperCase();
    return certificates.find((c) => c.id.toUpperCase() === cleaned);
  };

  return {
    certificates,
    generateCertificate,
    getCertificateById,
  };
}
