# Family Tree

A graph-based family relationship engine designed for Indian families.

The system models people and relationships as connected graph nodes and provides relationship discovery, traversal, lineage tracing, and visualization support.

The project is backend-first and designed to grow incrementally into a complete interactive family tree platform with frontend visualization support.

---

# Design Overview

## Core Principle

This project models a family as a graph, not a tree.

Each person is a node.

Relationships are edges between nodes.

Only fundamental relationships are stored directly:
- mother
- father
- spouse

All other relationships are derived dynamically using graph traversal.

Examples:
- siblings
- cousins
- uncles
- aunts
- grandparents
- nephews
- nieces

---

# Data Model

## Person

Each person contains:

```js
{
  id: "P001",
  name: "Ravi",
  gender: "male",
  dob: "1970-04-12",

  mother: "P020",
  father: "P021",

  spouses: ["P002"],

  siblingOrder: 2
}


```

kutumbam/
│
├── data/
├── src/
│   ├── models/
│   ├── services/
│   └── utils/
│
├── package.json
```

# Relationship Rules
## Upward Relationships

Each person can have:

- one mother
- one father

These are the only upward biological relationships stored directly.

## Horizontal Relationships

Horizontal relationships are derived using:

- common parents
- spouse connections

Examples:

- siblings
- cousins
- in-laws


## Downward Relationships

Children are not stored directly.

Children are dynamically discovered by searching for all persons where:

```
person.mother === targetId
OR
person.father === targetId
```

This prevents:

- duplicated data
- synchronization problems
- inconsistent family structures
- Relationship Engine

The relationship engine works using graph traversal.

The engine searches for paths between people and derives relationship names from the traversal path.

Example:

Me
→ Mother
→ Mother's Brother
→ His Son

Result:
Cousin


# Supported Relationship Categories
## Direct Relationships
English	Telugu

Mother	Amma
Father	Nanna
Son	Koduku
Daughter	Kuthuru
Husband	Bhartha
Wife	Bharya
Elder Brother	Anna 
Elder Sister	Akka 
Younder Brother  Thammudu
Younder Sister   Chelli


## Grandparent Relationships
English	Telugu

Maternal Grandfather	Thaathaya
Maternal Grandmother	Ammamma
Paternal Grandfather	Thaathaya
Paternal Grandmother	Nannamma


## Uncle and Aunt Relationships
English	

Maternal Uncle	Maavayya
Maternal Aunt	Pinni
Paternal Uncle	Babai
Paternal Aunt	Atha

## Cousin Relationships
English	Telugu

Cousin Elder Brother	Annayya
Cousin Elder Sister	Akka
Cousin Younger Brother Thammudu
Cousin Younger Sister   Chelli

## In-Law Relationships
English	Telugu

Father-in-law	Mamayya
Mother-in-law	Athayya
Brother-in-law	Baava
Sister-in-law	Maradalu


# Core Functionalities
## Person Management
- Add Person
- Update Person
- Delete Person
- Search Person
- View Person Details

## Relationship Management
- Add Parent Relationship
- Add Spouse Relationship
- Update Relationship
- Remove Relationship

## Relationship Discovery
### relationBetween(person1, person2)

Finds how person2 is related to person1.

Example:

relationBetween(Me, Ravi)
→ Maternal Uncle
relationBetweenGraph(person1, person2)

Returns the traversal path between two people.

Example:

Me
→ Mother
→ Mother's Brother
→ Ravi
relationBetween(person1, person2, viaPerson)

Finds relationships through a specified lineage path.

Example:

relationBetween(Me, Grandfather, Mother)
→ Maternal Grandfather

### relationBetweenGraph(person1, person2, viaPerson)

Returns traversal graph for lineage-specific relationship discovery.

## Planned Features
- Relationship Features
- Automatic Relationship Detection
- Telugu Relationship Labels
- Maternal vs Paternal Relationship Differentiation
- Elder/Younger Sibling Detection
- Family Branch Detection

## Visualization Features
- Interactive Family Tree
- Expandable Family Branches
- Relationship Path Highlighting
- Search and Focus
- Timeline View
- Mobile-Friendly Tree View

## Data Features
- JSON Import/Export
- Backup and Restore
- Relationship Validation
- Duplicate Person Detection


## Future Features
- Photos
- Stories and Notes

# To be added

## Frontend

To be added

## Database

To be added

## API Design

To be added

## Setup and Usage

To be added

## Technical Stack

To be added
