<?php  

namespace App\Repositories;

use App\Models\Team;

class TeamRepository{

    protected $modelTeam;

    public function __construct(Team $modelTeam)
    {
        $this->modelTeam = $modelTeam;
    }

    public function getAllTeams(){

        return $this->modelTeam::all();
    }

    public function create(array $data){

        return $this->modelTeam::create($data);
    }

}

?>