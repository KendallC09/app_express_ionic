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
  IonButton,
  IonAlert,
  IonSplitPane
} from '@ionic/react';
import ApiMethods from '../../commons/ApiMethods';
import { environment } from '../../environments/environment.dev';
import { useHistory, useParams } from 'react-router';

const ShowOrder: React.FC = () => {
  const history = useHistory();
  const { data: orders } = ApiMethods(`${environment.apiEndPoint}/api/orders`);
  const { data: orderDishes } = ApiMethods(`${environment.apiEndPoint}/api/order_dishes`);
  const { data: dishes } = ApiMethods(`${environment.apiEndPoint}/api/order_dishes`);

  const {deleteMethod} = ApiMethods(`${environment.apiEndPoint}/api/orders`);

  const {clientId} = useParams<{ clientId: any }>();

  const handleRedirect = () => {
    history.push(`/pages/List/${clientId}`);
    window.location.reload();
  }

  const deleteOrder = async (e: React.FormEvent, orderId: any) => {
    e.preventDefault();
    deleteMethod(orderId);
    window.location.reload();
  }

  return (
    <IonPage>
      <IonContent>
        {orders?.map((order: any) => {
          if (order.client.id == clientId) {
            return (
              <IonCard>
                <IonCardHeader className='IonCard'>
                  <IonTitle className='IonCardTitle'>Orden N° {order.id}: {order.dishes}</IonTitle>
                </IonCardHeader>
                <IonButton onClick={(e) => deleteOrder(e, order.id)}>Borrar orden</IonButton>
              </IonCard>
            )
          }
        })}
      </IonContent>
      <IonButton onClick={handleRedirect}>Volver</IonButton>
    </IonPage>
  )
}

export default ShowOrder;