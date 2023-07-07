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
  const { data: dishes } = ApiMethods(`${environment.apiEndPoint}/api/dishes`);
  const { data: orders } = ApiMethods(`${environment.apiEndPoint}/api/orders`);
  const { postMethod: postDishes } = ApiMethods(`${environment.apiEndPoint}/api/order_dishes`);

  const {clientId} = useParams<{ clientId: any}>();


  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();

    history.push('/pages/LoginForm')
    window.location.reload();
  }

  const addDishToOrder = async (e: React.FormEvent, dishId: any) => {
    e.preventDefault();
    if (!orders) {
      alert("No hay ordenes")
    } else {
      {
        orders?.map((order: any) => {
          if (order.client.id == clientId) {
           const body = {
            state: 0,//si se envia en 0 la orden aun no esta lista
            order_id: order.id,
            dish_id: dishId}
            postDishes(body);
            alert("Se agregó exitosamente")
          }
        })
      }
    }
  }

  if (!dishes) {
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
          {dishes?.map((dish: any) => {
            if(dish.state == "available") {
              return (
                <IonCard className='IonCard'>
                  <IonCardHeader>
                    <IonTitle className='IonCardTitle'>Nombre: {dish.name}</IonTitle>
                    <IonCardSubtitle className='IonCardSubtitle'>Precio: {dish.price}</IonCardSubtitle>
                    <IonButton>Descripción</IonButton>
                    <IonButton onClick={(e) => addDishToOrder(e, dish.id)}>Agregar al pedido</IonButton>
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