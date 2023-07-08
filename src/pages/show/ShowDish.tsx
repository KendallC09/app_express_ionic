import './ShowDish.css';
import {
  IonPage,
  IonHeader,
  IonTitle,
  IonContent,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonImg
} from '@ionic/react';
import ApiMethods from '../../commons/ApiMethods';
import { environment } from '../../environments/environment.dev';
import { useHistory, useParams } from 'react-router';

const ShowDish: React.FC = () => {
  const history = useHistory();
  const { data: dishes } = ApiMethods(`${environment.apiEndPoint}/api/dishes`);

  const {clientId, dishId} = useParams<{ clientId: any, dishId: any}>();

  const handleRedirect = () => {
    history.push(`/pages/List/${clientId}`);
    window.location.reload();
  }

  return (
    <IonPage>
      <IonContent>
        {dishes?.map((dish: any) => {
          console.log(dishes)
          if(dish.id == dishId){
            return (
              <IonCard className='IonCard'>
                <IonCardHeader>
                  <IonTitle className='IonCardTitle'>{dish.name}</IonTitle>
                  <IonCardSubtitle className='IonCardSubtitle'>{dish.description}</IonCardSubtitle>
                  <IonCardSubtitle className='IonCardSubtitle'>Precio: {dish.price}</IonCardSubtitle>
                  {dish.photo_url && (
                      <IonImg src={dish.photo_url} alt='Foto del plato' className='IonCard'/>
                  )}
                </IonCardHeader>
                
              </IonCard>
            )
          }
        })}
      </IonContent>
      <IonButton onClick={handleRedirect}>Volver</IonButton>
    </IonPage>
  )
}

export default ShowDish;