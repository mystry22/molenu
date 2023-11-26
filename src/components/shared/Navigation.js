import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PublicHome from '../user/Home';
import PublicContact from '../user/Contact';
import PublicAbout from '../user/About';
import PublicSuccess from '../user/Success';
import PublicShop from '../user/Shop';
import PublicDelivery from '../user/Delivery';
import PublicViewProduct from '../user/ViewProduct';
import PublicCart from '../user/Cart';
import PublicSignup from '../user/Signup';
import PublicSignupData from '../user/Signupuserdata';
import PublicLogin from '../user/Login';
import PublicOrder from '../user/Order';
import PublicPayment from '../user/Payment';
import AdminAddProducts from '../admin/AddProduct';
import AdminLogin from '../admin/AdminLogin';
import AdminPending from '../admin/Pending';
import AdminWorking from '../admin/Working';
import AdminAddCategory from '../admin/AddCategory';
import AdminRemoveCategory from '../admin/removeCategory';
import AdminAddProdImage from '../admin/AddProductImage';
import AdminEditProduct from '../admin/EditProduct';
import AdminChanges from '../admin/AffectChanges';
import AdminViewPendings from '../admin/ViewPendings';
import AdminViewWorkings from '../admin/ViewWorking';
import AdminViewReady from '../admin/ViewReady';
import AdminPrintReady from '../admin/PrintReady';



function Navigation() {
  return (
      <Router>
        <Switch>
        
          <Route path="/" exact component={PublicHome} />
          <Route path="/about" exact component={PublicAbout} />
          <Route path="/contact" exact component={PublicContact} />
          <Route path="/success" exact component={PublicSuccess} />
          <Route path="/viewproduct/:ref" exact component={PublicViewProduct} />
          <Route path="/cart" exact component={PublicCart} />
          <Route path="/shop" exact component={PublicShop} />
          <Route path="/delivery" exact component={PublicDelivery} />
          <Route path="/login" exact component={PublicLogin} />
          <Route path="/signup" exact component={PublicSignup} />
          <Route path="/order" exact component={PublicOrder} />
          <Route path="/payment" exact component={PublicPayment} />
          <Route path="/userdata" exact component={PublicSignupData} />
          <Route path="/addproduct" exact component={AdminAddProducts} />
          <Route path="/addcategory" exact component={AdminAddCategory} />
          <Route path="/addproductimage" exact component={AdminAddProdImage} />
          <Route path="/editproduct" exact component={AdminEditProduct} />
          <Route path="/changes/:ref" exact component={AdminChanges} />
          <Route path="/viewpendings/:ref" exact component={AdminViewPendings} />
          <Route path="/pending" exact component={AdminPending} />
          <Route path="/viewworking/:ref" exact component={AdminViewWorkings} />
          <Route path="/working" exact component={AdminWorking} />
          <Route path="/ready" exact component={AdminViewReady} />
          <Route path="/print/:ref" exact component={AdminPrintReady} />
          <Route path="/admin" exact component={AdminLogin} /> 
          <Route path="/removecategory" exact component={AdminRemoveCategory} />
          
        </Switch>
      </Router>
      
  )
}

export default Navigation