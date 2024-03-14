export default function UserProfile({params}:any){
    return(
        <div>
            <h1>Profile</h1>
            <hr />
            <p>profile page <span className="bg-yellow-100 text-black">{params.id}</span> </p>
        </div>
    )
}