const Player = ({ index, player } : any ) => {
    return (
        <div className="w-5/6 max-w-3xl">

        <div className="mb-3  flex w-full  flex-row  gap-5 ">
            <p className="font-black self-center" > {index} </p> 
            <img src={player.image} className="h-14 w-14 rounded-full border-2 border-black bg-white"></img>
            <span className='self-center font-black'>{player.username}</span>
            <span className='self-center flex-grow text-right'>{player.score}</span>
            
          </div>
          <hr className="border-t w-full border-black mb-4"/>
        </div>
    );
}

export default Player;