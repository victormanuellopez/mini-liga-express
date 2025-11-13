<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Team extends Model
{
    use HasFactory;

    // Nombre de la tabla en la base de datos
    protected $table = 'teams';

    // Campos que pueden ser asignados
    protected $fillable = [
        'name',
        'goals_for',
        'goals_against',
    ];
}
