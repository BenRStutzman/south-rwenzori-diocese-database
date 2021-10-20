﻿namespace SrdDatabase.Models
{
    public class Parish
    {
        public int Id { get; }

        public string Name { get; }

        public int ArchdeaconryId { get; }

        public string Archdeaconry { get; }
        
        public Parish(int id, string name, int archdeaconryId, string archdeaconry)
        {
            Id = id;
            Name = name;
            ArchdeaconryId = archdeaconryId;
            Archdeaconry = archdeaconry;
        }

        // For Dapper
        public Parish()
        {
        }
    }
}
