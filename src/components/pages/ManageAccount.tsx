function ManageAccount() {
  const token = localStorage.getItem("JWT");

  if (!token) {
    console.error("JWT token not found");
    return <div>Error: JWT token not found</div>;
  }
  return(
    <div>
      asdfsd
    </div>
  )
}

export default ManageAccount;
