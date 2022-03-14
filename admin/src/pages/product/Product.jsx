import { Link, useLocation } from "react-router-dom";
import "./product.css";
import Chart from "../../components/chart/Chart"
import { Publish } from "@material-ui/icons";
import {useSelector, useDispatch} from 'react-redux'
import {useState, useMemo, useEffect} from 'react'
import {UserRequest} from '../../requestMethod'
import { updateProduct } from "../../redux/apiCalls";


export default function Product() {

    const location = useLocation();
    const productId = location.pathname.split("/")[2];
    const [pStats, setPStats] = useState([]);
    const dispatch = useDispatch();
  
    const product = useSelector((state) =>
      state.product.products.find((product) => product._id === productId)
    );

    const [title, setTitle] = useState(product.title);
  

    const handleClick = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            inStock:true,
            _id:product._id,
            title:title,
            description:product.description,
            img: product.img
          };

          try {
            const res = await UserRequest.put("/products/" + product._id, updatedProduct);
            updateProduct(product._id, updatedProduct, dispatch)
        } catch (err) {console.log(err)}

        
    }

    const MONTHS = useMemo(
        () => [
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Agu",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
        []
      );
    
      useEffect(() => {
        const getStats = async () => {
          try {
            const res = await UserRequest.get("orders/income?pid=" + productId);
            const list = res.data.sort((a,b)=>{
                return a._id - b._id
            })
            list.map((item) =>
              setPStats((prev) => [
                ...prev,
                { name: MONTHS[item._id - 1], Sales: item.total },
              ])
            );
          } catch (err) {
            console.log(err);
          }
        };
        getStats();
      }, [productId, MONTHS]);

    console.log(title);
    

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Product</h1>
        <Link to="/newproduct">
          <button className="productAddButton">Create</button>
        </Link>
      </div>
      <div className="productTop">
        <div className="productTopLeft">
          <Chart data={pStats} dataKey="Sales" title="Sales Performance" />
        </div>
        <div className="productTopRight">
          <div className="productInfoTop">
            <img src={product.img} alt="" className="productInfoImg" />
            <span className="productName">{product.title}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">id:</span>
              <span className="productInfoValue">{product._id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">description:</span>
              <span className="productInfoValue"></span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">in stock:</span>
              <span className="productInfoValue">{product.inStock}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm">
          <div className="productFormLeft">
            <label>Product Name</label>
            <input value={title} onChange={(e) => setTitle(e.target.value)} type="text" placeholder={product.title} />
            <label>Product Description</label>
            <input type="text" placeholder={product.description} />
            <label>Price</label>
            <input type="text" placeholder={product.price} />
            <label>In Stock</label>
            <select name="inStock" id="idStock">
              <option value="true">Yes</option>
              <option value="false">No</option>
            </select>
          </div>
          <div className="productFormRight">
            <div className="productUpload">
              <img src={product.img} alt="" className="productUploadImg" />
              <label for="file">
                <Publish />
              </label>
              <input type="file" id="file" style={{ display: "none" }} />
            </div>
            <button onClick={handleClick} className="productButton">Update</button>
          </div>
        </form>
      </div>
    </div>
  );
}
