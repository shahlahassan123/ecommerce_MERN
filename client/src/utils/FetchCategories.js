import React, { useState, useEffect } from 'react';
import { useQuery } from 'react-query';
import axios from 'axios';
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import FetchProducts from './FetchProducts';

// const BASE_URL = 'http://localhost:9000/categories';
const  BASE_URL = 'https://ecommerce-mern-hc963njrh-shahlahassan123s-projects.vercel.app/categories'

const fetchAllCategories = () => {
  return axios.get(BASE_URL);
};

const fetchCategoriesWithProducts = async (categories) => {
  const categoriesWithProducts = [];

  for (let category of categories) {
    const { data } = await axios.get(
      `https://api.escuelajs.co/api/v1/products/?categoryId=${category.id}`
    );

    if (data.length > 0) {
      categoriesWithProducts.push(category);
    }
  }

  return categoriesWithProducts;
};

const FetchCategories = () => {
  const { isLoading, data } = useQuery('all-categories', fetchAllCategories);
  const [expanded, setExpanded] = useState(false);
  const [categoriesWithProducts, setCategoriesWithProducts] = useState([]);

  let categories = data?.data; // Use optional chaining to handle undefined data


  useEffect(() => {
    if (categories && categories.length > 0) {
      setExpanded(categories[0].name);
    }
  }, [categories]);

  useEffect(() => {
    if (categories && categories.length > 0) {
      fetchCategoriesWithProducts(categories).then((result) => {
        setCategoriesWithProducts(result);
      });
    }
  }, [categories]);

  if (isLoading) {
    return <p>Loading</p>;
  }

  const handleChange = (panel, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {categoriesWithProducts.length > 0 ? (
        categoriesWithProducts.map((category, index) => {
          return (
            <Accordion
              key={index}
              expanded={expanded === category.name}
              onChange={(event, isExpanded) => handleChange(category.name, isExpanded)}
            >
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography>{category.name}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <FetchProducts categoryId={category.id} />
              </AccordionDetails>
            </Accordion>
          );
        })
      ) : (
        <p>No categories with products found</p>
      )}
    </>
  );
};

export default FetchCategories;


// import React, {useState,useEffect} from 'react'
// import {useQuery} from 'react-query'
// import axios from 'axios'
// import {Accordion, AccordionSummary, AccordionDetails, Typography} from '@mui/material'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import FetchProducts from './FetchProducts'

// const BASE_URL = "http://localhost:9000/categories"

// const fetchAllCategories = () =>{
//   return axios.get(BASE_URL)
// }

// const FetchCategories = () => {
//     const { isLoading, data } = useQuery('all-categories', fetchAllCategories);
//     const [expanded, setExpanded] = useState(false);

//     const [hasProducts, setHasProducts] = useState(true);
  
//     const [categoriesWithProducts, setCategoriesWithProducts] = useState([]); 
//     let categories = data?.data; // Use optional chaining to handle undefined data
//     console.log("categories", categories)
  
//     useEffect(() => {
//       if (categories && categories.length > 0) {
//         setExpanded(categories[0].name);
//       }
//     }, [categories]);
  
//     if (isLoading) {
//       return <p>Loading</p>;
//     }
  
//     const handleChange = (panel, isExpanded) => {
//       setExpanded(isExpanded ? panel : false);
//     };

//     useEffect(() => {
//       const fetchCategoriesWithProducts = async () => {
//         const categoriesWithProducts = [];
  
//         for (let category of categories) {
//           const { data } = await axios.get(
//             `https://api.escuelajs.co/api/v1/products/?categoryId=${category.id}`
//           );
  
//           if (data.length > 0) {
//             categoriesWithProducts.push(category);
//           }
//         }
  
//         setCategoriesWithProducts(categoriesWithProducts);
//       };
  
//       fetchCategoriesWithProducts();
//     }, [categories]);
  
//     return (
//       <>
//         {categoriesWithProducts.length > 0 ? (
//           categoriesWithProducts.map((category, index) => {
//             console.log('cate', category.id);
//             return (
//               <Accordion
//                 key={index}
//                 expanded={expanded === category.name}
//                 onChange={(event, isExpanded) => handleChange(category.name, isExpanded)}
//               >
//                 <AccordionSummary expandIcon={<ExpandMoreIcon />}>
//                   <Typography>{category.name}</Typography>
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <FetchProducts categoryId={category.id} />
//                 </AccordionDetails>
//               </Accordion>
//             );
//           })
//         ) : (
//           <p>No categories with products found</p>
//         )}
//       </>
//     );
//   };
  
//   export default FetchCategories;

  //WORKING
  
  //   return (
  //     <>
  //       {categories &&
  //         categories.map((category, index) => {
  //           console.log('cate', category.id)
  //           return (
  //             <Accordion
  //               key={index}
  //               expanded={expanded === category.name}
  //               onChange={(event, isExpanded) =>
  //                 handleChange(category.name, isExpanded)
  //               } 
  //             >
                
  //               <AccordionSummary expandIcon={<ExpandMoreIcon />}>
  //                 <Typography>{category.name}</Typography>
  //               </AccordionSummary>
  //               <AccordionDetails>
  //                 <FetchProducts categoryId={category.id} setHasProducts={setHasProducts} />
  //               </AccordionDetails>
  //             </Accordion>
  //           );
  //         })}
  //     </>
  //   );
  // };
  
  // export default FetchCategories;
  

