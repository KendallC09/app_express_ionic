import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonPage, IonItem, IonLabel } from '@ionic/react';
import ApiMethods from '../../commons/ApiMethods';
import { environment } from '../../environments/environment.dev';
import { useHistory, useParams } from 'react-router';

const EditClientForm: React.FC = () => {
  const [firstNameEdit, setFirstNameEdit] = useState('');
  const [lastNameEdit, setLastNameEdit] = useState('');
  const [physicalAddressEdit, setPhysicalAddressEdit] = useState('');
  const [message, setMessage] = useState('');

  const history = useHistory();

  const { putMethod } = ApiMethods(`${environment.apiEndPoint}/api/clients`);

  const {clientId} = useParams<{ clientId: any}>();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = {
      first_name: firstNameEdit,
      last_name: lastNameEdit,
      physical_address: physicalAddressEdit
    }
    putMethod(clientId, body);
    setMessage('Datos Actualizados!');
    setFirstNameEdit('');
    setLastNameEdit('');
    setPhysicalAddressEdit('');
  }

  const handleRedirect = () => {
    history.push(`/pages/List/${clientId}`);
    window.location.reload
  }

  return (
    <IonPage>
      <IonContent>
        <h1>{message}</h1>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px'}}>
          <IonItem>
            <IonLabel position='floating'>Nombre</IonLabel>
            <IonInput
              type='text'
              value={firstNameEdit}
              onIonChange={(e) => setFirstNameEdit(e.detail.value!)}
              required/>
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Apellido</IonLabel>
            <IonInput
              type='text'
              value={lastNameEdit}
              onIonChange={(e) => setLastNameEdit(e.detail.value!)}
              required/>
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Dirección</IonLabel>
            <IonInput
              type='text'
              value={physicalAddressEdit}
              onIonChange={(e) => setPhysicalAddressEdit(e.detail.value!)}
              required/>
          </IonItem>
          <IonButton expand="full" type="submit" style={{marginTop: '20px'}}>
            Actualizar Datos
          </IonButton>
          <IonButton onClick={handleRedirect} expand="full" style={{marginTop: '20px'}}>
            Volver
          </IonButton>
        </form>
      </IonContent>
    </IonPage>
  )
}

export default EditClientForm;