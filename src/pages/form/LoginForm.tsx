import React, { useState } from 'react';
import { IonContent, IonInput, IonButton, IonItem, IonLabel } from '@ionic/react';
import { useHistory } from 'react-router';
import ApiMethods from '../../commons/ApiMethods';
import { environment } from '../../environments/environment.dev';

const LoginForm: React.FC = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const { data, refetch } = ApiMethods(`${environment.apiEndPoint}/api/clients`);

  const { postMethod } = ApiMethods(`${environment.apiEndPoint}/api/orders`);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!data) {
      history.push('/pages/LoginForm')
      window.location.reload()
    } else {
      {
        data?.map((client: any) => {
          if (client.email == email) {
            if (client.password == password) {
              const body = {
                state: 0,
                client_id: client.id
              }
              postMethod(body);
              history.push(`/pages/List/${client.id}`);
              window.location.reload()
            }
          }
        })
      }
    }
    setEmail('');
    setPassword('');
  }

  const handleRegistration = () => {
    history.push('/pages/RegistrationForm');
    window.location.reload()
  }

  return (
    <IonContent>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '20px' }}>
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
            required />
        </IonItem>
        <IonButton expand="full" type="submit" style={{ marginTop: '20px' }}>
          Iniciar Sesión
        </IonButton>
        <IonButton onClick={handleRegistration} expand="full" style={{ marginTop: '20px' }}>Registrarse</IonButton>
      </form>
    </IonContent>
  );
}

export default LoginForm;