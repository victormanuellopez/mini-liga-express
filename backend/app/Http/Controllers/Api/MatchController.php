<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Matchs;
use App\Models\Team;
use App\Repositories\MatchRepository;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class MatchController extends Controller
{   
    protected $matchRepo;

    public function __construct(MatchRepository $matchRepo)
    {
        $this->matchRepo = $matchRepo; 
    }


    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $matchs = $this->matchRepo->getAllMatch();

        return response()->json($matchs, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }

    public function result(Request $request, $id_match){

        // 1. VALIDACIÓN ACTUALIZADA
        $request->validate([
            'homeScore' => 'required|integer',
            'awayScore' => 'required|integer',
        ]);

        try {
            
            $match = $this->matchRepo->sendResultMatch(
                $id_match,
                $request->homeScore,
                $request->awayScore

            );

            return response()->json($match, 200);

        }catch (\Exception $e){
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}
