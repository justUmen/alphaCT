// @/components/Pagination.js
'use client';
import { useRouter } from "next/navigation";

function Pagination({ currentPage, totalPages, categories, searchValue }: { currentPage: number, totalPages: number, categories?: string, searchValue?: string }) {
    const router = useRouter();
  
    const goToPage = (newPage: number) => {
      if(categories){
        router.push(`/search/${categories}?page=${newPage}`); //This is for a "Specific Category"
      }
      else{
        if(searchValue){
          router.push(`/search?q=${searchValue}&page=${newPage}`); //This is for a "Custom Search"
        }
        else{
          router.push(`/search?page=${newPage}`); //This is for "All Products" no categories
        }
      }
    };
  
    return (
      <div className="flex justify-center mt-4 mb-4 space-x-2">
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage <= 1}
          className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md ${currentPage <= 1 ? 'cursor-not-allowed text-gray-400 bg-gray-800 border-2 border-gray-400' : 'hover:bg-black text-white bg-gray-800 border-2 border-gray-800'}`}
        >
          &#8592; {/* Left arrow symbol */}
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
          <button
            key={pageNum}
            disabled={pageNum === currentPage}
            onClick={() => goToPage(pageNum)}
            className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md ${pageNum === currentPage ? 'text-white bg-gray-800 border-2 border-white' : 'text-white bg-gray-800 hover:bg-black border-2 border-gray-800'}`}
          >
            {pageNum}
          </button>
        ))}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage >= totalPages}
          className={`w-8 h-8 flex items-center justify-center text-sm font-medium rounded-md ${currentPage >= totalPages ? 'cursor-not-allowed text-gray-400 bg-gray-800 border-2 border-gray-400' : 'hover:bg-black text-white bg-gray-800 border-2 border-gray-800'}`}
        >
          &#8594; {/* Right arrow symbol */}
        </button>
      </div>
    );
    
    
    
  }
  export default Pagination;