# Swiggy Clone - Krupesh Vachhani
# Date:18-11-2024

- made a navbar simple design
- implement getting location by lat and long using navigator
- implement public api hitting of swiggy and getting data based on lat and long
  - error: getting cors error so installed allows cors from my side using chrome extention
- implement api fetch on change of lat and long from local-storage
- implemented this api & thi api taken from swiggy website
  - https://www.swiggy.com/dapi/restaurants/list/v5?lat=${latitude}&lng=${longitude}&page_type=DESKTOP_WEB_LISTING


# Date: 19-11-2024

- Not getting api response from swiggy after using cors chrome extension
  - create node js proxy server and solved that issue
- swiggy switched from cloudnary api to thier own midea assets cdn
  - https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/cloudnary-id
  - old url for fetching img - https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/