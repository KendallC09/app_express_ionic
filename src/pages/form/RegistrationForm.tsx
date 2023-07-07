import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonPage, IonItem, IonLabel } from '@ionic/react';
import ApiMethods from '../../commons/ApiMethods';
import { environment } from '../../environments/environment.dev';
import { useHistory } from 'react-router';

const RegistrationForm: React.FC = () => {

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [physicalAddress, setPhysicalAddress] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const history = useHistory();

  const { postMethod } = ApiMethods(`${environment.apiEndPoint}/api/clients`);

  const handleSubmit = (e: React.FormEvent) => { //validar si no se crea bien
    e.preventDefault();
    const body = {
      state: 0,
      first_name: firstName,
      last_name: lastName,
      physical_address: physicalAddress,
      email: email,
      password: password
    }
    postMethod(body);
    setMessage('Registro Completado!');
    setFirstName('');
    setLastName('');
    setPhysicalAddress('');
    setEmail('');
    setPassword('');

    history.push('/pages/LoginForm');
    window.location.reload();

  }

  const handleRedirect = () => {
    history.push('/pages/LoginForm');
    window.location.reload()
  }

  return (
    <IonPage>
      <IonContent>
        <h1>{message}</h1>
        <form onSubmit={handleSubmit} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px'}}>
          <IonItem>
            <IonLabel position='floating'>Nombre</IonLabel>
            <IonInput
              type="text"
              value={firstName}
              onIonChange={(e) => setFirstName(e.detail.value!)}
              required />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Apellido</IonLabel>
            <IonInput
              type="text"
              value={lastName}
              onIonChange={(e) => setLastName(e.detail.value!)}
              required />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Dirección</IonLabel>
            <IonInput
              type="text"
              value={physicalAddress}
              onIonChange={(e) => setPhysicalAddress(e.detail.value!)}
              required />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Correo Electrónico</IonLabel>
            <IonInput
              type="email"
              value={email}
              onIonChange={(e) => setEmail(e.detail.value!)}
              required />
          </IonItem>
          <IonItem>
            <IonLabel position='floating'>Contraseña</IonLabel>
            <IonInput
              type="password"
              value={password}
              onIonChange={(e) => setPassword(e.detail.value!)}
              required
            />
          </IonItem>
          <IonButton expand="full" type="submit" style={{marginTop: '20px'}}>
            Registrarse
          </IonButton>
          <IonButton onClick={handleRedirect} expand="full" style={{ marginTop: '20px' }}>Volver</IonButton>
        </form>
      </IonContent>
    </IonPage>
  );
}

export default RegistrationForm;