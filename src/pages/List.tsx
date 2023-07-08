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
  IonButton,
  IonAlert,
  IonSplitPane
} from '@ionic/react';
import ApiMethods from '../commons/ApiMethods';
import { environment } from '../environments/environment.dev';
import { useHistory, useParams } from 'react-router';
import Menu from '../components/Menu';

const List: React.FC = () => {

  const history = useHistory();
  const { data: dishes } = ApiMethods(`${environment.apiEndPoint}/api/dishes`);
  const { data: orders } = ApiMethods(`${environment.apiEndPoint}/api/orders`);
  const { postMethod: postDishes, putMethod: putOrdersDishes  } = ApiMethods(`${environment.apiEndPoint}/api/order_dishes`);
  const { postMethod: postOrder } = ApiMethods(`${environment.apiEndPoint}/api/orders`);

  const {clientId} = useParams<{ clientId: any }>();

  const handleLogout = (e: React.FormEvent) => {
    e.preventDefault();

    history.push('/pages/LoginForm')
    window.location.reload();
  }

  const handleMenu = () => {
    history.push(`/pages/List/${clientId}`)
    window.location.reload();
  }

  const handleEditClient = () => {
    history.push(`/pages/EditClientForm/${clientId}`);
    window.location.reload();
  }

  const handleSendOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!orders) {
      alert("No hay ordenes");
    } else {
      let ultimoId: number | undefined;
      orders?.forEach((order_dish: any) => {
        ultimoId = order_dish.id;
      });
      if (ultimoId !== undefined) {
        const body = {
          state: 1
        }
        putOrdersDishes(ultimoId, body)
        alert("La orden se agregó correctamente")
      } else {
        alert("Algo salió mal")
      }
    }
  };

  const addDishToOrder = async (e: React.FormEvent, dishId: any) => {
    e.preventDefault();
    if (!orders) {
      alert("No hay ordenes")
    } else {
      {orders?.map((order: any) => {
        if (order.client.id == clientId) {
          const body = {
            state: 0,
            order_id: order.id,
            dish_id: dishId 
          }
          postDishes(body);
          alert("Se agregó exitosamente")
        }
      })
      }
    }
  }

  const showDish = async (e: React.FormEvent, dishId: any) => {
    e.preventDefault();
    history.push(`/pages/ShowDish/${clientId}/${dishId}`);
    window.location.reload();
  }

  const showOrder = () => {
    history.push(`/pages/ShowOrder/${clientId}`);
    window.location.reload();
  }

  const createOrder = () => {
    const body = {
      state: 0,
      client_id: clientId
    }
    postOrder(body);
    alert('Orden Creada');
  }

  if (!dishes) {
    return <h1>Cargando...</h1>
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonButton onClick={handleMenu}>Menú</IonButton>
          <IonButton onClick={handleEditClient}>Editar Datos</IonButton>
          <IonButton onClick={createOrder}>Crear Orden</IonButton>
          <IonButton onClick={showOrder}>Ver Orden</IonButton>
          <IonButton onclick={handleSendOrder}>Enviar Orden</IonButton>
          <IonButton onClick={handleLogout}>Cerrar Sesión</IonButton>
        </IonHeader>
        <IonContent>
          {dishes?.map((dish: any) => {
            if(dish.state == "available") {
              return (
                <IonCard className='IonCard'>
                  <IonCardHeader>
                    <IonTitle className='IonCardTitle'>{dish.name}</IonTitle>
                    <IonCardSubtitle className='IonCardSubtitle'>Precio: {dish.price}</IonCardSubtitle>
                    <IonButton onClick={(e) => showDish(e, dish.id)}>Descripción</IonButton>
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