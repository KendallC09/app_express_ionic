import './List.css';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton
} from '@ionic/react';
import ApiMethods from '../commons/ApiMethods';
import { environment } from '../environments/environment.dev';
import { useHistory, useParams } from 'react-router';

const List: React.FC = () => {
  const history = useHistory();
  
  const {data, refetch} = ApiMethods(`${environment.apiEndPoint}/api/dishes`);
  
  const {clientId} = useParams<{ clientId: any}>();

  const { deleteMethod } = ApiMethods(`${environment.apiEndPoint}/api/orders`);

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();

    history.push('/pages/LoginForm')
    window.location.reload
  }

  if (!data) {
    return <h1>Cargando...</h1>
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              Menú
            </IonTitle>
            <IonButton onClick={handleLogout}>Cerrar Sesión</IonButton>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {data?.map((dish: any) => {
            if(dish.state == "available") {
              return (
                <IonCard className='IonCard'>
                  <IonCardHeader>
                    <IonTitle className='IonCardTitle'>Nombre: {dish.name}</IonTitle>
                    <IonCardSubtitle className='IonCardSubtitle'>Precio: {dish.price}</IonCardSubtitle>
                    <IonButton>Descripción</IonButton>
                    <IonButton>Agregar al pedido</IonButton>
                  </IonCardHeader>
                </IonCard>
              )
            }
          })}
        </IonContent>
      </IonPage>
    )
  }
}

export default List;
