import React from 'react';
import ContentLoader from 'react-content-loader'

export const Skeleton = (props) => (
    <ContentLoader 
    speed={2}
    width={500}
    height={500}
    viewBox="0 0 500 500"
    backgroundColor="#cccccc"
    foregroundColor="#4f4f4f"
    {...props}
  >
    <rect x="5" y="3" rx="8" ry="8" width="300" height="300" /> 
    <rect x="6" y="310" rx="8" ry="8" width="270" height="15" /> 
    <rect x="6" y="330" rx="8" ry="8" width="135" height="15" />
  </ContentLoader>
)

export const DepartmentNavSkeleton = (props) => (
  <ContentLoader 
    speed={2}
    width={150}
    height={60}
    viewBox="0 0 150 50"
    backgroundColor="#cccccc"
    foregroundColor="#4f4f4f"
    {...props}
  >
    <rect x="3" y="26" rx="8" ry="8" width="130" height="12" />
  </ContentLoader>
)


export const SubDepartmentsSkeleton = (props) => (
  <ContentLoader 
  speed={2}
  width={420}
  height={500}
  viewBox="0 0 400 500"
  backgroundColor="#cccccc"
  foregroundColor="#4f4f4f"
  {...props}
>
  <rect x="10" y="3" rx="8" ry="8" width="360" height="400" /> 
  <rect x="10" y="420" rx="8" ry="8" width="270" height="15" /> 
</ContentLoader>
)


export const SubDepartmentsImageSkeleton = (props) => (
  <ContentLoader 
  speed={2}
  width={1500}
  height={500}
  viewBox="0 0 1500 500"
  backgroundColor="#cccccc"
  foregroundColor="#4f4f4f"
  {...props}
>
  <rect x="0" y="0" rx="0" ry="0" width="1500" height="500" /> 
</ContentLoader>
)


export const ProductPageImg = (props) => (
  <ContentLoader 
  speed={2}
  width={500}
  height={500}
  viewBox="0 0 500 500"
  backgroundColor="#cccccc"
  foregroundColor="#4f4f4f"
  {...props}
>
  <rect x="0" y="0" rx="0" ry="0" width="500" height="500" /> 
</ContentLoader>
)



export const ProductPageh1 = (props) => (
  <ContentLoader 
  speed={2}
  width={400}
  height={20}
  viewBox="0 0 400 20"
  backgroundColor="#cccccc"
  foregroundColor="#4f4f4f"
  {...props}
>
  <rect x="0" y="5" rx="8" ry="8" width="400" height="15" /> 
</ContentLoader>
)



export const ProductPagePrice = (props) => (
  <ContentLoader 
  speed={2}
  width={60}
  height={20}
  viewBox="0 0 60 20"
  backgroundColor="#cccccc"
  foregroundColor="#4f4f4f"
  {...props}
>
  <rect x="0" y="5" rx="8" ry="8" width="60" height="15" /> 
</ContentLoader>
)

export const ProductDescription = (props) => (
  <ContentLoader 
  speed={2}
  width={450}
  height={100}
  viewBox="0 0 450 100"
  backgroundColor="#cccccc"
  foregroundColor="#4f4f4f"
  {...props}
>
  <rect x="0" y="5" rx="8" ry="8" width="450" height="13" /> 
  <rect x="0" y="25" rx="8" ry="8" width="350" height="13" /> 
  <rect x="0" y="45" rx="8" ry="8" width="250" height="13" /> 
</ContentLoader>
)


export const ProductDetails = (props) => (
  <ContentLoader 
  speed={2}
  width={450}
  height={115}
  viewBox="0 0 450 150"
  backgroundColor="#cccccc"
  foregroundColor="#4f4f4f"
  {...props}
>
  <rect x="0" y="5" rx="8" ry="8" width="350" height="15" /> 
  <rect x="0" y="35" rx="8" ry="8" width="350" height="15" /> 
  <rect x="0" y="70" rx="8" ry="8" width="350" height="15" /> 
  <rect x="0" y="105" rx="8" ry="8" width="350" height="15" /> 
</ContentLoader>
)