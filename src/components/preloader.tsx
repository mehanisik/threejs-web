


function Preloader({progress}:{progress:number}) {
    return (
        <div className="absolute inset-0 flex z-50 items-center justify-center">
            <div className="text-2xl font-bold">{progress}</div>
        </div>
    )
}

export default Preloader