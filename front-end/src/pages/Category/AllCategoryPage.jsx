import '../style/Style.css'
import CategoryContainer from '../../components/category/CategoryContainer';
import Pagination from '../../components/Uitily/Pagination';
import allCategoryHook from '../../hook/category/all-category-page-hook';


const AllCategoryPage = () => {

  const [category, loading, pageCount, getPage] = allCategoryHook();

  return (
    <div  className='page-height'>
      <CategoryContainer  data={category.data}  loading={loading}/>
      {
        pageCount > 1 ? (
          <Pagination  pageCount={pageCount}  onPress={getPage}/>
        ) : null
      }
    </div>
  )
}

export default AllCategoryPage;