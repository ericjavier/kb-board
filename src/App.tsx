import { AppContainer } from "./styles";
import { AddNewItem } from "./AddNewItem";
import { Column } from "./Column";
import { useAppState } from "./hooks/useAppState";
import { addList } from './state/actions';
import { CustomDragLayer } from './CustomDragLayer';


export const App = () => {
  const { lists, dispatch } = useAppState();
  return (
    <AppContainer>
      <CustomDragLayer />
      {lists.map(l => (<Column id={l.id} key={l.id} text={l.text}/>))}
      <AddNewItem toggleButtonText="+ Add another list" onAdd={t => dispatch(addList(t))} />
    </AppContainer>
  );
};
