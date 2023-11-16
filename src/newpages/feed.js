import Filter from '../newcomponents/filter';
import Footer from '../newcomponents/footer';
import Form from '../newcomponents/form-user';
import Header from '../newcomponents/header';

const NEWFEED= () => {
  return (
    <main className='main'>
        <Header></Header>
        <Form></Form>
      {/* <Filter></Filter> */}
      
      <Footer></Footer>
      
    </main>
  );

}




export default NEWFEED;
