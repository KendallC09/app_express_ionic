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

const List: React.FC = () => {
  const {data, refetch} = ApiMethods(`${environment.apiEndPoint}/products`);

  if (!data) {
    return <h1>Cargando...</h1>
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>
              Productos
            </IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          {data?.map((product: any) => {
            return (
              <IonCard className='IonCard'>
                <IonCardHeader>
                  <IonTitle className='IonCardTitle'>Nombre: {product.name}</IonTitle>
                  <IonCardSubtitle className='IonCardSubtitle'>Precio: {product.price}</IonCardSubtitle>
                </IonCardHeader>
              </IonCard>
            )
          })}
        </IonContent>
      </IonPage>
    )
  }
}

export default List;
