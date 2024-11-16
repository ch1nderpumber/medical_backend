
export default function (limit: any, page: any): number[] {
  if(page) {
    try{
      page = parseInt(page);
    }
    catch{
      page = null;
    }
  }
  
  if(limit) {
    try{
      limit = parseInt(limit);
    }
    catch{
      limit = null;
    }
  }
  
  page = page || 1;
  limit = limit || 10;
  const offset = (page - 1) * limit;
  
  return [limit, offset];
}