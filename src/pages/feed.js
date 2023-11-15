import Filter from '../components/filter';
import Footer from '../components/footer';
import Form from '../components/form-user';
import Header from '../components/header';
import deleteItem from '../img/delete-item.svg';

const Feed= () => {
  return (
    <main className='main'>
        <Header></Header>
        <Form></Form>
      {/* <Filter></Filter> */}
      
      <Footer></Footer>
      
    </main>
  );

}




export default Feed;
